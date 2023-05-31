import { gql } from "@apollo/client";

export const GET_CARRITO = gql`
    query GetCarrito($userId: String!) {
        carrito(where: {userId: {_eq: $userId}}) {
            userId
            cantidad
            precioU
            name
            productId
            size
            uid
            url_img
            pasillo
        }
    }
`;