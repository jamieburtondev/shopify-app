import {
  Form,
  TextContainer,
  Heading,
  RadioButton,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';

const CheckAgeRestriction = ({ render }) => {
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

        {render(underage || underage === null)}
      </ButtonGroup>
    </Fragment>
  );
};

CheckAgeRestriction.propTypes = {
  render: PropTypes.func
}

export default CheckAgeRestriction;
