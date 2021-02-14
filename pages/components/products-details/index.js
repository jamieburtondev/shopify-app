import { Fragment } from "react";
import { Frame, Loading } from "@shopify/polaris";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "../../queries";
import { SET_STOCK } from "../../mutations";
import getProductsToShow from "../../helpers/getProductsToShow";

const Products = ({ id, searchValue, searchCollection, checked }) => {
  const { data, loading, error, refetch: _refetch } = useQuery(GET_PRODUCTS, {
    variables: { id: `gid://shopify/Location/${id}` },
  });

  const refetch = (args) => _refetch(args);
  const [setStock] = useMutation(SET_STOCK);

  if (loading) {
    return (
      <div className="loading">
        <Frame>
          <Loading />
        </Frame>
      </div>
    );
  }

  if (error) return error;

  const productsToShow = getProductsToShow({
    products: data.products.edges,
    checked,
    searchValue,
    searchCollection,
    refetch,
    setStock
  });

  return <Fragment>{productsToShow}</Fragment>;
};

export default Products;
