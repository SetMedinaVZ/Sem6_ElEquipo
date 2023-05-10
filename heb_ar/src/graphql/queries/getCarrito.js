import { gql } from "@apollo/client";

export const GET_CARRITO = gql`
    query getCarrito {
        carrito {
            cantidad
            precioU
            productId
            uid
            userId
            name
            size
        }
    }
`;