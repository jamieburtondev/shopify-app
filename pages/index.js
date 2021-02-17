import React, { useState } from "react";
import { Page, Tabs, Button } from "@shopify/polaris";
import "./style.css";
import Orders from "./containers/orders";
import Products from "./components/products";
import Location from "./components/location";
import GetLocation from "./components/get-location";

const Index = () => {
  const initialCollections = [
    "Cold Beverages",
    "Hot Beverages",
    "Salty Snacks",
    "Sweet Snacks",
    "Best Selling Items",
    "Food",
    "Alcohol",
    "Tobacco",
  ];

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

  const [location, useLocation] = useState(null);
  const retrieveLocation = (newLocation) => useLocation(newLocation);

  const [selectedTab, useSelectedTab] = useState(0);
  const handleTabChange = (newTab) => useSelectedTab(newTab);

  const [collections] = useState(initialCollections);

  return (
    <Page>
      <div className="store-header">
        {location && <Location id={location}></Location>}

        {location && (
          <div className="store-header-right small-spacing">
            <Button primary onClick={() => useLocation("")}>
              Change Location
            </Button>
          </div>
        )}
      </div>

      {location && (
        <Tabs
          selected={selectedTab}
          tabs={tabs}
          onSelect={handleTabChange}
        >
          {location && (selectedTab === 0 || selectedTab === 1) && (
            <Orders location={location} tab={selectedTab}></Orders>
          )}
          {location && selectedTab === 2 && (
            <Products collections={collections} id={location}></Products>
          )}
        </Tabs>
      )}

      {!location && (
        <GetLocation retrieveLocation={retrieveLocation}></GetLocation>
      )}
    </Page>
  );
};

export default Index;
