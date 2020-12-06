import { Component } from "react";
import { Page, Tabs } from "@shopify/polaris";

import Orders from "./components/orders";
import Products from "./components/products";
import Location from "./components/location";
import GetLocation from "./components/get-location";
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = { location: null, selectedTab: 0 };
    this.retrieveLocation = this.retrieveLocation.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  retrieveLocation(location) {
    this.setState({ location });
  }

  handleTabChange(selectedTab) {
    this.setState({ selectedTab });
  }

  render() {
    const { selectedTab } = this.state;
    const tabs = [
      {
        id: "tab1",
        content: "Orders Received",
      },
      {
        id: "tab2",
        content: "Ready for Pickup",
      },
      {
        id: "tab3",
        content: "Stock",
      },
    ];

    return (
      <Page>
        { this.state.location && <Location id={this.state.location}></Location>}

        {this.state.location && (
          <Tabs
            selected={selectedTab}
            tabs={tabs}
            onSelect={this.handleTabChange}
          >
            {this.state.location && (this.state.selectedTab === 0 || this.state.selectedTab === 1) && (
              <Orders location={this.state.location} tab={this.state.selectedTab}></Orders>
            )}
            { this.state.location && this.state.selectedTab === 2 && <Products id={this.state.location}></Products> }
          </Tabs>
        )}

        {!this.state.location && (
          <GetLocation retrieveLocation={this.retrieveLocation}></GetLocation>
        )}
      </Page>
    );
  }
}

export default Index;