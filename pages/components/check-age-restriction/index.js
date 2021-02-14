import {
  Form,
  TextContainer,
  Heading,
  RadioButton,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { Fragment, useState } from "react";

const CheckAgeRestriction = () => {
  const [underage, useUnderage] = useState(null);

  return (
    <Fragment>
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
          onChange={() => useUnderage(false)}
        />
        <RadioButton
          label="No"
          helpText="The age restricted items will need to be removed."
          name="age"
          value={true}
          onChange={() => useUnderage(true)}
        />
      </Form>

      <ButtonGroup spacing="loose">
        {
          <Button disabled={!underage} secondary>
            Remove Underage Items
          </Button>
        }

        {this.props.render(underage || underage === null)}
      </ButtonGroup>
    </Fragment>
  );
};

export default CheckAgeRestriction;
