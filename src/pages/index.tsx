import { PageProps } from "gatsby";
import * as React from "react";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = (props: PageProps) => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1>It's basic bLog</h1>
    </main>
  );
};

export default IndexPage;
