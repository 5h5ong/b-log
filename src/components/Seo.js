import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title }) => {
  return (
    <Helmet>
      <title>{`b:Log | ${title}`}</title>
      {/* Google Search Engine Verification */}
      <meta
        name="google-site-verification"
        content="hXzBIUorkHEVsO9Jb_mIDuDqsTRSzyOx9rvhZ3GrZj8"
      />
    </Helmet>
  );
};

export default Seo;
