import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title }) => {
  return (
    <Helmet>
      <title>{`b:Log | ${title}`}</title>
    </Helmet>
  );
};

export default Seo;
