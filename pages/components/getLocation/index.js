import { Component } from 'react';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = { location: null }

    this.submitLocation = this.submitLocation.bind(this);
  }

  submitLocation(e) {
    e.preventDefault();
    console.log('SUBMIT LOCATION');
    console.log('this.state.location', this.state.location);

    if (this.state.location) {
      this.props.retrieveLocation(this.state.location);
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.submitLocation}>
          <label> Store Location: </label>
          <input onChange={ e => this.setState({ location: e.target.value })} type="text" />
          <p> Example: 56861196486 </p>
          <button type="submit"> Submit</button>
        </form>
      </div>
    );
  }
};

export default Locations;
