import React from "react";
import { connectHits } from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";

/**
 * Component to render each hit from the search bar.
 * @param {hit} hit have the data of the product like capacidad, departamento,
 * producto, precio, etc. For access to the data you need to use the attribute
 * of the data like hit.Producto, hit.Precio, etc.
 * @returns {JSX} JSX element to render each product
 */

const Hits = ({ hits }) => {
  const navigate = useNavigate();

  //Function to navigate to the product page passing the hit data
  const navigateToProduct = (hit) => {
    return () => {
      navigate("/producto", { state: { hit } });
    };
  };

  return (
    <ol>
      {hits.length === 0 && <li>No hay resultados</li>}
      {hits.map((hit) => (
        <li key={hit.objectID} onClick={navigateToProduct(hit)}>{hit.name}</li>
      ))}
    </ol>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
