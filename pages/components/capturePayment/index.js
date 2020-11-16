import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// mutation  {
//   orderCapture(
//     input: {
//       id: "2999273423046"
//       parentTransactionId: "3757022347462"
//       amount: "5.99"
//     }
//   ) {
//     transaction {
//       id
//     }
//   }
// }

const POST_CAPTURE_PAYMENT = gql`
  mutation OrderCapture(
    $id: String!
    $parentTransactionId: String!
    $amount: Money!
  ) {
    orderCapture(
      input: {
        id: $id
        parentTransactionId: $parentTransactionId
        amount: $amount
      }
    ) {
      transaction {
        id
      }
    }
  }
`;

const CapturePayment = (props) => {
  const { id, parentTransactionId, amount } = props;
  const [capture] = useMutation(POST_CAPTURE_PAYMENT);

  return (
    <div>
    <button
      onClick={() => {
        console.log('props', props);
        capture({ variables: { id, parentTransactionId, amount } });
      }}
    >
      Capture Payment
    </button>
    </div>
  );
};

export default CapturePayment;
