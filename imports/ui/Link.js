import React from "react";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinksListFilters from "./LinksListFilters";
import DeleteAll from "./DeleteAll";

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <div className="page-content">
        <LinksListFilters />
        <AddLink />
        <DeleteAll />
        <LinksList />
      </div>
    </div>
  );
};
