import {
  Form,
  TextContainer,
  Heading,
  RadioButton,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { Component, Fragment } from "react";

class CheckAgeRestriction extends Component {
  constructor(props) {
    super(props);

    this.state = { underage: null };
  }

  render() {
    const ageRestriction = (
      <Form>
        <TextContainer>
          <Heading> Age Restricted </Heading>
          <p>
            Is the customer old enough to buy the age restricted products in
            this order?
          </p>
        </TextContainer>
        <RadioButton
          label="Yes"
          helpText="The order is ready for pickup!"
          name="age"
          value={false}
          onChange={() => this.setState({ underage: false })}
        />
        <RadioButton
          label="No"
          helpText="The age restricted items will need to be removed."
          name="age"
          value={true}
          onChange={() => this.setState({ underage: true })}
        />
      </Form>
    );

    return (
      <Fragment>
        {ageRestriction}

        <ButtonGroup spacing="loose">
          {
            <Button disabled={!this.state.underage} secondary>
              Remove Underage Items
            </Button>
          }

          {this.props.render(
            this.state.underage || this.state.underage === null
          )}
        </ButtonGroup>
      </Fragment>
    );
  }
}

export default CheckAgeRestriction;
