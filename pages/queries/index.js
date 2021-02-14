import gql from "graphql-tag";

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      name
      address {
        address1
        city
        provinceCode
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($id: ID!) {
    order(id: $id) {
      lineItems(first: 10) {
        edges {
          node {
            image {
              originalSrc
            }
            title
            originalTotalSet {
              shopMoney {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ORDERS = (location) => gql`
query {
  orders(first: 10, query:"reference_location_id:${location} AND financial_status:authorized") {
    edges {
      node {
        name
        id
        customer {
          firstName
          lastName
        }
        createdAt
        customAttributes {
          key
          value
        }
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        email
        phone
        transactions(capturable: true, first: 1) {
          id
        }
      }
    }
  }
}
`;

export const GET_PRODUCTS = gql`
  query GetProductLevel($id: ID!) {
    products(first: 10) {
      edges {
        node {
          id
          title
          collections(first: 2) {
            edges {
              node {
                title
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
          variants(first: 3) {
            edges {
              node {
                id
                title
                inventoryItem {
                  inventoryLevel(locationId: $id) {
                    id
                    available
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
