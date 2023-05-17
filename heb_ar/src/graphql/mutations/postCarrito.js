import { gql } from "@apollo/client";

export const POST_CARRITO = gql`
    mutation InsertCarrito($cantidad: Int, $uid: uuid!) {
        update_carrito_by_pk(pk_columns: {uid: $uid}, _set: {cantidad: $cantidad}) {
            cantidad
        }
    }  
`;