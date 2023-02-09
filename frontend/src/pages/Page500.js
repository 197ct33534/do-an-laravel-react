import React from "react";
import { Link } from "react-router-dom";

const Page500 = () => {
  return (
    <div>
      <Link to="/manager/home">
        <img
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          src={process.env.PUBLIC_URL + "/assets/images/500.png"}
          alt=""
        />
      </Link>
    </div>
  );
};

export default Page500;
