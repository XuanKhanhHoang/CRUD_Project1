import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-3 mainBody">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Page Not Found</h1>
          <p className="text-center">
            The page you are looking for does not exist.
          </p>
          <div
            href="/"
            className="btn btn-primary btn-lg mt-5 mx-auto col-4 d-block"
            onClick={() => navigate("/")}
          >
            Go Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
