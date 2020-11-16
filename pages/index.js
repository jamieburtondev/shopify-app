import { Component } from "react";
import { Heading, Page, Button } from "@shopify/polaris";

import GetLocation from "./components/getLocation";
import Orders from "./components/orders/orders";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = { location: null };
    this.retrieveLocation = this.retrieveLocation.bind(this);
  }

  retrieveLocation(location) {
    console.log("RETRIEVED LOCATION", location);
    this.setState({ location });
  }

  render() {
    console.log("this.state.location", this.state.location);
    return (
      <Page>
        <Heading> Let's make an app. 🎉</Heading>
        {!this.state.location && (
          <GetLocation retrieveLocation={this.retrieveLocation}></GetLocation>
        )}

        {this.state.location && (
          <Orders location={this.state.location}></Orders>
        )}
      </Page>
    );
  }
}

export default Index;
