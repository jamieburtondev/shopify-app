import gql from "graphql-tag";

export const SET_STOCK = gql`
  mutation VariantOutOfStock($inventoryLevelId: ID!, $stockAdjustment: Int!) {
    inventoryAdjustQuantity(
      input: {
        availableDelta: $stockAdjustment
        inventoryLevelId: $inventoryLevelId
      }
    ) {
      inventoryLevel {
        available
      }
    }
  }
`;

export const POST_CAPTURE_PAYMENT = gql`
  mutation CapturePayment(
    $id: String!
    $parentTransactionId: String!
    $amount: String!
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