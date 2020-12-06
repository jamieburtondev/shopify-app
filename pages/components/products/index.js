import React, { Component, Fragment } from "react";
import ProductDetails from "../products-details";
import { Stack, RadioButton } from "@shopify/polaris";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: true };
    this.toggleProducts = this.toggleProducts.bind(this);
  }

  toggleProducts(e) {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <Fragment>
        <h1> Products </h1>
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
        <ProductDetails
          id={this.props.id}
          checked={this.state.checked}
        ></ProductDetails>
      </Fragment>
    );
  }
}

export default Products;
