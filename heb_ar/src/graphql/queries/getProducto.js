import { gql } from "@apollo/client";

export const GET_PRODUCTO = gql`
    query getProducto {
        producto {
            categoria
            marca
            nombre
            pasillo
            subcategoria
            unidad
            numero_pasillo
            popularidad_index
            precio
            UPC
            url_img
            id
        }
    }
`;