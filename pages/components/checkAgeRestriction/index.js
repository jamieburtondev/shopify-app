import { Component } from "react";

class CheckAgeRestriction extends Component {
  constructor(props) {
    super(props);

    this.state = { underage: true };
  }

  render() {
    const ageRestriction = (
      <form>
        <p>
          <b> AGE RESTRICTION </b>
        </p>
        <p>
          Is the customer old enough to buy the age restricted products in this
          order?
        </p>
        <input
          type="radio"
          name="age"
          value={false}
          onChange={() => this.setState({ underage: false })}
        />
        Yes
        <input
          type="radio"
          name="age"
          value={true}
          onChange={() => this.setState({ underage: true })}
        />
        No
      </form>
    );

    console.log(
        "Not old enough:",
        this.props.restricted && this.state.underage
      );
    //   console.log("PROPS", this.props.restricted);
    //   console.log("STATE", this.state.underage);

    return (
      <div>
        {this.props.restricted && this.state.underage
          ? ageRestriction
          : this.props.render}
      </div>
    );
  }
}

export default CheckAgeRestriction;
