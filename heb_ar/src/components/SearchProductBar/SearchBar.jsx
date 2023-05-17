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
    "bd944d31db1d25fa2f64acaeb3263cb1"
  );

  return (
    <div className="my-2">
      <InstantSearch
        searchClient={searchClient}
        indexName="productsV2"
        onSearchStateChange={({ query }) => setSearchState({ query })}
        searchState={searchState}
      >
        <Configure hitsPerPage={3} />
        <CustomSearchBox defaultRefinement="iphone" />
        {searchState.query && <CustomHits />}
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
