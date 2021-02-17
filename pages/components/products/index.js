import React, { Fragment, useState } from "react";
import ProductDetails from "../products-details";
import { Stack, RadioButton, TextField, Select } from "@shopify/polaris";
import PropTypes from "prop-types";

const Products = ({ collections, id }) => {
  const [checked, useChecked] = useState(true);
  const toggleProducts = (e) => useChecked(!checked);

  const [searchValue, useSearchValue] = useState("");
  const getSearchValue = (value) => useSearchValue(value);

  const [searchCollection, useSearchCollection] = useState("");
  const getSearchCollection = (collection) => useSearchCollection(collection);

  const options = [
    { label: "", value: "" },
    ...collections.map((collection) => ({
      label: collection,
      value: collection.toLowerCase(),
    })),
  ];

  return (
    <Fragment>
      <div className="stock">
        <Stack vertical>
          <RadioButton
            label="Show In Stock Products"
            helpText="Only items in stock will be shown."
            checked={checked}
            name="accounts"
            onChange={toggleProducts}
          />
          <RadioButton
            label="Show Out of Stock Products"
            helpText="Only items out of stock will be shown."
            name="accounts"
            checked={!checked}
            onChange={toggleProducts}
          />
        </Stack>
      </div>
      <div className="small-spacing">
        <TextField
          label="Filter By Name"
          value={searchValue}
          onChange={(val) => getSearchValue(val)}
        />
      </div>
      <div className="small-spacing">
        <Select
          label="Filter By Collection"
          options={options}
          value={searchCollection}
          onChange={(collectionValue) => getSearchCollection(collectionValue)}
        />
      </div>
      <ProductDetails
        searchCollection={searchCollection}
        searchValue={searchValue}
        id={id}
        checked={checked}
      ></ProductDetails>
    </Fragment>
  );
};

Products.propTypes = {
  collections: PropTypes.array,
  id: PropTypes.number
}

export default Products;
