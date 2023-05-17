import React from "react";
import { connectHits } from "react-instantsearch-dom";

//TODO FrontEnd: Create a component to render each product prettier
/**
 * Component to render each hit from the search bar.
 * @param {hit} hit have the data of the product like capacidad, departamento,
 * producto, precio, etc. For access to the data you need to use the attribute
 * of the data like hit.Producto, hit.Precio, etc.
 * @returns {JSX} JSX element to render each product
 */

const Hits = ({ hits }) => {
    console.log(hits)
  return (
    <ol>
      {hits.map((hit) => (
        <li key={hit.objectID}>{hit.name}</li>
      ))}
    </ol>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
