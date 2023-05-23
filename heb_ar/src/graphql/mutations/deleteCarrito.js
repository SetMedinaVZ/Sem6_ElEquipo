import { gql } from "@apollo/client";

export const DELETE_CARRITO = gql`
    mutation DeleteCarrito($uid: String!) {
        delete_carrito(where: {uid: {_eq: $uid}}) {
            returning {
                name
            }
        }
    }
`;