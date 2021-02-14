import { Component, useState } from "react";
import { Modal, TextField, Button, Form } from "@shopify/polaris";
import locations from "../../data/locations.json";

const Locations = ({ retrieveLocation }) => {
  const [open, useOpen] = useState(true);
  const submitLocation = (e) => {
    e.preventDefault();

    useOpen(false);
    retrieveLocation(locations[location]);
  };

  const [location, useLocation] = useState("");
  const changeLocation = (newLocation) => useLocation(newLocation);

  return (
    <Modal title="Store Location" open={open}>
      <Modal.Section>
        <Form onSubmit={submitLocation}>
          <TextField
            label="Location ID"
            focused={true}
            value={location}
            onChange={changeLocation}
            helpText="Add your store's Location ID (e.g. 2)."
          />

          <div className="small-spacing">
            <Button primary submit disabled={!locations[location]}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Section>
    </Modal>
  );
};

export default Locations;
