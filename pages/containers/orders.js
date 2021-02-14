import Orders from "../components/orders";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ pickup: state.pickup });

export default connect(mapStateToProps)(Orders);
