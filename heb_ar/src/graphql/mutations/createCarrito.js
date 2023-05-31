import { gql } from "@apollo/client";

export const CREATE_CARRITO = gql`
    mutation InsertCarrito($cantidad: Int, $productId: String, $name: String, $size: String, $url_img: String, $precioU: Float, $userId: String, $pasillo: String) {
        insert_carrito(objects: {cantidad: $cantidad, productId: $productId, name: $name, size: $size, url_img: $url_img, precioU: $precioU, userId: $userId, pasillo: $pasillo}) {
            affected_rows
        }
    }
`;