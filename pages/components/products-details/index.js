import { Fragment } from 'react';
import {
  Frame,
  Loading,
  Card,
  Heading,
  Button,
  MediaCard,
  Subheading,
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
  const { id } = props;
  const { data, loading, error, refetch: _refetch } = useQuery(GET_PRODUCTS, {
    variables: { id: `gid://shopify/Location/${id}` },
  });
  // BUG FIX
  const refetch = (args) => _refetch(args);
  const [
    setStock
  ] = useMutation(SET_STOCK);

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

  const formattedProducts = products.map((product) => {
    const title = product.node.title;
    const image = product.node.images.edges[0].node.originalSrc;
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

    return { title, variants, image };
  });

  const outOfStockProducts = [];
  const inStockProducts = [];

  formattedProducts.forEach(product => {
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
      {productsToShow.map((product, index) => (
        <Card key={`${product.title}-${index}`}>
          <Card.Section>
            <Heading> {product.title} </Heading>
          </Card.Section>

          <MediaCard>
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
          </MediaCard>

          {product.variants.map((variant) => (
            <Card>
              <p> {variant.available} </p>

              {variant.title === "Default Title" ? (
                ""
              ) : (
                <Subheading> {variant.title} </Subheading>
              )}

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
            </Card>
          ))}
        </Card>
      ))}
    </Fragment>
  );
};

export default Products;
