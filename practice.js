// query GetProductLevel($id: ID!) {
//     products(first: 10, query:"title:*Bar*") {
//       edges {
//         node {
//           id
//           title
//           variants(first: 3) {
//             edges {
//               node {
//                 id
//                 title
//                 inventoryItem {
//                   inventoryLevel(locationId: $id) {
//                     available
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

// Personal Pizza
// Snickers Bar

// {
//     "id": "gid://shopify/Location/56861196486"
//   }

// gid://shopify/Product/5966816936134
// gid://shopify/ProductVariant/37226121461958


// query GetProductLevel($id: ID!) {
//     products(first: 75) {
//       edges {
//         node {
//           id
//           title
//           variants(first: 3) {
//             edges {
//               node {
//                 id
//                 title
//                 inventoryItem {
//                   inventoryLevel(locationId: $id) {
//                     available
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

// ...
// mutation VariantStock($inventoryLevelId: ID!) {
//     inventoryAdjustQuantity(input: { availableDelta: 5, inventoryLevelId: $inventoryLevelId}) {
//       inventoryLevel {
//         available
//       }
//     }
//   }
  
  

// {
//     "variantId": "gid://shopify/ProductVariant/37226121461958",
//     "locationId": "gid://shopify/Location/56861196486"
//   }