import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams, useNavigate } from "react-router-dom";
import errorimg from "../Home/error--img.png";
import "./index.css";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserInformation(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <ColorRing
          height="180"
          width="800"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <img src={errorimg} alt="Error" className="error-image" />
        <h1>Something went wrong</h1>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userInformation) {
    return <p>No user information available</p>;
  }

  const { name, username, email, phone, website, address, company } =
    userInformation;

  return (
    <div className="Ui-bg">
      <h1 className="heading">User Information</h1>
      <div className="user-detail">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        </p>
        <h3>Address:</h3>
        <p>
          <strong>Street:</strong> {address.street}
        </p>
        <p>
          <strong>Suite:</strong> {address.suite}
        </p>
        <p>
          <strong>City:</strong> {address.city}
        </p>
        <p>
          <strong>Zipcode:</strong> {address.zipcode}
        </p>
        <p>
          <strong>Geo:</strong> Lat: {address.geo.lat}, Lng: {address.geo.lng}
        </p>
        <h3>Company:</h3>
        <p>
          <strong>Name:</strong> {company.name}
        </p>
        <p>
          <strong>Catchphrase:</strong> {company.catchPhrase}
        </p>
        <p>
          <strong>Business:</strong> {company.bs}
        </p>
      </div>
      <button type="button" onClick={() => navigate("/")} className="back-btn">
        Back
      </button>
    </div>
  );
};

export default UserDetail;
