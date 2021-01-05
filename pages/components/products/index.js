import React, { Component, Fragment } from "react";
import ProductDetails from "../products-details";
import { Stack, RadioButton, TextField, Select } from "@shopify/polaris";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: true, searchValue: "", searchCollection: "" };
    this.toggleProducts = this.toggleProducts.bind(this);
  }

  toggleProducts(e) {
    this.setState({ checked: !this.state.checked });
  }

  searchProducts(value) {
    this.setState({ searchValue: value });
  }

  searchCollection(collection) {
    this.setState({ searchCollection: collection });
  }

  render() {
    const options = [
      { label: "", value: "" },
      ...this.props.collections.map((collection) => ({
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
              checked={this.state.checked}
              name="accounts"
              onChange={this.toggleProducts}
            />
            <RadioButton
              label="Show Out of Stock Products"
              helpText="Only items out of stock will be shown."
              name="accounts"
              checked={!this.state.checked}
              onChange={this.toggleProducts}
            />
          </Stack>
        </div>
        <div className="small-spacing">
          <TextField
            label="Filter By Name"
            value={this.state.searchValue}
            onChange={(searchValue) => this.searchProducts(searchValue)}
          />
        </div>
        <div className="small-spacing">
          <Select
            label="Filter By Collection"
            options={options}
            value={this.state.searchCollection}
            onChange={(collectionValue) =>
              this.searchCollection(collectionValue)
            }
          />
        </div>
        <ProductDetails
          searchCollection={this.state.searchCollection}
          searchValue={this.state.searchValue}
          id={this.props.id}
          checked={this.state.checked}
        ></ProductDetails>
      </Fragment>
    );
  }
}

export default Products;
