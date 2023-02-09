import React from "react";

const NotFound = () => {
  return (
    <div>
      <img
        style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        src={process.env.PUBLIC_URL + "/assets/images/404.jpg"}
        alt=""
      />
    </div>
  );
};

export default NotFound;
