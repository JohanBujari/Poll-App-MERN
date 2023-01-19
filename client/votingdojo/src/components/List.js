import React from "react";
import Top3Polls from "./Top3Polls";

const List = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
      <Top3Polls />
    </div>
  );
};

export default List;
