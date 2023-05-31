import { gql } from "@apollo/client";

export const GET_PRODUCTO = gql`
  query GetProducto($upc: String!) {
    producto(where: {upc: {_eq: $upc}}) {
      net_cont
      price
      calories
      fats
      id
      name
      sugars
      upc
      url_img
      pasillo
    }
  } 
`;