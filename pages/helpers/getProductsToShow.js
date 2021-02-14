import { Card, Button } from "@shopify/polaris";

const getProductsToShow = ({
  products,
  checked,
  searchCollection,
  searchValue,
  refetch,
  setStock,
}) => {
  let formattedProducts = products.map((product) => {
    const {
      title,
      images,
      variants: productVariants,
      collections: productCollections,
    } = product.node;
    const image = images.edges[0].node.originalSrc;
    const collections = productCollections.edges.map((collection) =>
      collection.node.title.toLowerCase()
    );
    let variants = [];

    productVariants.edges.forEach((variant) => {
      const {
        title: variantTitle,
        inventoryItem: { inventoryLevel },
      } = variant.node;
      const variantAvailable = inventoryLevel ? inventoryLevel.available : null;
      const inventoryLevelId = inventoryLevel ? inventoryLevel.id : null;
      variants.push({
        title: variantTitle,
        available: variantAvailable,
        inventoryLevelId,
      });
    });

    return { title, variants, image, collections };
  });

  if (searchValue) {
    formattedProducts = formattedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (searchCollection) {
    formattedProducts = formattedProducts.filter((product) =>
      product.collections.includes(searchCollection.toLowerCase())
    );
  }

  const outOfStockProducts = [];
  const inStockProducts = [];

  formattedProducts.forEach((product, index) => {
    [outOfStockProducts, inStockProducts].forEach((arr) =>
      arr.push(Object.assign({}, product, { variants: [] }))
    );

    product.variants.forEach((variant) => {
      if (typeof variant.available === "number") {
        variant.available
          ? inStockProducts[index].variants.push(variant)
          : outOfStockProducts[index].variants.push(variant);
      }
    });
  });

  const productsToShow = checked
    ? inStockProducts.filter((products) => products.variants.length)
    : outOfStockProducts.filter((products) => products.variants.length);

  return getJSX({ productsToShow, refetch, setStock });
};

const getJSX = ({ productsToShow, refetch, setStock, searchValue, searchCollection }) => {
  switch (productsToShow.length) {
    case 0:
      if (!searchValue || searchCollection)
        return <p> No results match the filter. </p>;
      return <p>There are currently no results. </p>;
    default:
      return productsToShow.map((product, index) => (
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
      ));
  }
};

export default getProductsToShow;
