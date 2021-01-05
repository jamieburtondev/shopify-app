import { Fragment } from "react";
import {
  Frame,
  Loading,
  Card,
  Button
} from "@shopify/polaris";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_PRODUCTS = gql`
  query GetProductLevel($id: ID!) {
    products(first: 10) {
      edges {
        node {
          id
          title
          collections(first: 2) {
            edges {
              node {
                title
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
          variants(first: 3) {
            edges {
              node {
                id
                title
                inventoryItem {
                  inventoryLevel(locationId: $id) {
                    id
                    available
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SET_STOCK = gql`
  mutation VariantOutOfStock($inventoryLevelId: ID!, $stockAdjustment: Int!) {
    inventoryAdjustQuantity(
      input: {
        availableDelta: $stockAdjustment
        inventoryLevelId: $inventoryLevelId
      }
    ) {
      inventoryLevel {
        available
      }
    }
  }
`;

const Products = (props) => {
  const { id, searchValue, searchCollection } = props;
  const { data, loading, error, refetch: _refetch } = useQuery(GET_PRODUCTS, {
    variables: { id: `gid://shopify/Location/${id}` },
  });
  // BUG FIX
  const refetch = (args) => _refetch(args);
  const [setStock] = useMutation(SET_STOCK);

  if (loading) {
    return (
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    );
  }

  if (error) return error;

  const products = data.products.edges;

  let formattedProducts = products.map((product) => {
    const title = product.node.title;
    const image = product.node.images.edges[0].node.originalSrc;
    const collections = product.node.collections.edges.map(collection => collection.node.title.toLowerCase());
    let variants = [];
    product.node.variants.edges.forEach((variant) => {
      const variantTitle = variant.node.title;
      const variantAvailable = variant.node.inventoryItem.inventoryLevel
        ? variant.node.inventoryItem.inventoryLevel.available
        : null;
      const inventoryLevelId = variant.node.inventoryItem.inventoryLevel
        ? variant.node.inventoryItem.inventoryLevel.id
        : null;
      variants.push({
        title: variantTitle,
        available: variantAvailable,
        inventoryLevelId,
      });
    });

    return { title, variants, image, collections };
  });

  if (searchValue) {
    formattedProducts = formattedProducts.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

  if (searchCollection) {
    formattedProducts = formattedProducts.filter(product => product.collections.includes(searchCollection.toLowerCase()));
  }

  const outOfStockProducts = [];
  const inStockProducts = [];

  formattedProducts.forEach((product) => {
    const inStock = [];
    const outOfStock = [];

    product.variants.forEach((variant) => {
      if (typeof variant.available === "number") {
        variant.available ? inStock.push(variant) : outOfStock.push(variant);
      }
    });

    if (inStock.length) {
      inStockProducts.push(Object.assign({}, product, { variants: inStock }));
    }

    if (outOfStock.length) {
      outOfStockProducts.push(
        Object.assign({}, product, { variants: outOfStock })
      );
    }
  });

  const productsToShow = props.checked ? inStockProducts : outOfStockProducts;

  return (
    <Fragment>
      {productsToShow.length === 0 && (props.searchValue || props.searchCollection) && <p> No results match the filter. </p>}
      { productsToShow.length === 0 && !props.searchValue && !props.searchCollection && <p>There are currently no results. </p> }
      {productsToShow.length > 0 && productsToShow.map((product, index) => (
        <Card key={`${product.title}-${index}`}>
          <Card.Section>
            <p className="product-title"> {product.title} </p>
          </Card.Section>

          <div className="media-card-spacing">
              <img
                src={product.image ? product.image : null}
                alt=""
                width="100px"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
          </div>

          <div className="product-variants">
            {product.variants.map((variant) => (
              <div
                className="product-variant"
                key={`${product.title}-${variant.title}-${index}`}
              >
                {variant.title === "Default Title" ? (
                  <p className="stock-variant-title"> Only Variant </p>
                ) : (
                  <p className="stock-variant-title"> {variant.title} </p>
                )}

                {/* <p className="stock-variant-available"> Amount Available: {variant.available} </p> */}

                <div className="small-spacing">
                  <Button
                    primary
                    onClick={async () => {
                      await setStock({
                        variables: {
                          inventoryLevelId: variant.inventoryLevelId,
                          stockAdjustment: props.checked
                            ? variant.available * -1
                            : 10,
                        },
                      });

                      refetch();
                    }}
                  >
                    {variant.available ? "Set Out of Stock" : "Set In Stock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default Products;
