import Order from '../components/order';
import { connect } from "react-redux";
import { addToPickup, removeFromPickup } from "../store/actions";

const mapDispatchToProps = (dispatch) => ({
  addToPickup: (id) => dispatch(addToPickup({ id })),
  removeFromPickup: (id) => dispatch(removeFromPickup({ id })),
});

export default connect(null, mapDispatchToProps)(Order);
