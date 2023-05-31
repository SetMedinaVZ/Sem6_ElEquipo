import { gql } from "@apollo/client";

export const DELETE_CARRITO_USER = gql`
    mutation DeleteCarritoUser($userId: String!) {
        delete_carrito(where: {userId: {_eq: $userId}}) {
            returning {
                name
            }
        }
    }
`;