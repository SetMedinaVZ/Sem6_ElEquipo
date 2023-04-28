import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
} from "react-instantsearch-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHits from "./CustomHits";

const SearchBar = () => {
  const [searchState, setSearchState] = useState({ query: "" });

  const searchClient = algoliasearch(
    "M771IO5IGR",
    "109dc70929910a60d7bfe9727fedf07d"
  );

  return (
    <div className="my-7">
      <InstantSearch
        searchClient={searchClient}
        indexName="products"
        onSearchStateChange={({ query }) => setSearchState({ query })}
        searchState={searchState}
      >
        <Configure hitsPerPage={5} />
        <CustomSearchBox defaultRefinement="iphone" />
        {searchState.query && <CustomHits />}
        
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
