import { Component } from "react";
import { Modal, TextField, Button, Form } from "@shopify/polaris";
import locations from "../../data/locations.json";

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = { open: true, location: "" };

    this.submitLocation = this.submitLocation.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  submitLocation(e) {
    e.preventDefault();
    
    this.setState({ open: false }, () => {
      this.props.retrieveLocation(locations[this.state.location]);
    });
  }

  changeLocation(location) {
    this.setState({ location });
  }

  render() {
    return (
      <Modal
        title="Store Location"
        open={this.state.open}
      >
        <Modal.Section>
          <Form onSubmit={this.submitLocation}>
            <TextField
              label="Location ID"
              focused={true}
              value={this.state.location}
              onChange={this.changeLocation}
              helpText="Add your store's Location ID (e.g. 2)."
            />

            <Button primary submit disabled={!locations[this.state.location]}>
              Submit
            </Button>
          </Form>
        </Modal.Section>
      </Modal>
    );
  }
}

export default Locations;
