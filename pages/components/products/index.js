import React, { Component, Fragment } from "react";
import ProductDetails from "../products-details";
import { Stack, RadioButton, TextField, Select } from "@shopify/polaris";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: true, searchValue: "", searchCollections: "" };
    this.toggleProducts = this.toggleProducts.bind(this);
  }

  toggleProducts(e) {
    this.setState({ checked: !this.state.checked });
  }

  searchProducts(value) {
    this.setState({ searchValue: value });
  }

  searchCollections(collection) {
    this.setState({ searchCollections: collection });
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
            value={this.state.searchCollections}
            onChange={(collectionValue) =>
              this.searchCollections(collectionValue)
            }
          />
        </div>
        <ProductDetails
          searchCollections={this.state.searchCollections}
          searchValue={this.state.searchValue}
          id={this.props.id}
          checked={this.state.checked}
        ></ProductDetails>
      </Fragment>
    );
  }
}

export default Products;
