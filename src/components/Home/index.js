import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import { ColorRing } from "react-loader-spinner";
import errorImg from "./error--img.png";
import "./index.css";

const optionList = [
  { name: "Default", id: "default" },
  { name: "A - Z", id: "a-z" },
  { name: "Z - A", id: "z-a" },
];

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [originalUserList, setOriginalUserList] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserList(data);
        setOriginalUserList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const generateRandomColor = () => {
    const maxVal = 0xffffff;
    const randomNumber = Math.floor(Math.random() * maxVal);
    const randColor = randomNumber.toString(16).padStart(6, "0");
    return `#${randColor.toUpperCase()}`;
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortOption(selectedSort);

    if (selectedSort === "default") {
      setUserList(originalUserList);
      return;
    }

    const sortedList = [...userList].sort((a, b) => {
      if (selectedSort === "a-z") {
        return a.name.localeCompare(b.name);
      } else if (selectedSort === "z-a") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    setUserList(sortedList);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const handleUserClick = (id) => {
    navigate(`/users/${id}`);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ColorRing
          height="180"
          width="180"
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
        <img src={errorImg} alt="Error" className="error-image" />
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

  return (
    <div className="bg">
      <h1 className="heading">User Directory</h1>

      <div className="valueContainer">
        <select value={sortOption} onChange={handleSortChange}>
          {optionList.map((each) => (
            <option key={each.id} value={each.id}>
              {each.name}
            </option>
          ))}
        </select>
        <br />
        <label>
          <input
            placeholder="Search"
            type="text"
            className="input-box"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span>
            <FaSearch size={17} onClick={handleSearchChange} />
          </span>
        </label>
      </div>

      <ul className="user-container">
        {filteredUsers.map((eachitem) => (
          <li
            className="card-item"
            key={eachitem.id}
            onClick={() => handleUserClick(eachitem.id)}
          >
            <NameInitialsAvatar
              name={eachitem.name}
              bgColor={generateRandomColor()}
              size={80}
              textColor="#ffffff"
              textSize={20}
              className="user-intial-img"
            />
            <div className="user-description">
              <p>
                <span>Name: </span>
                {eachitem.name}
              </p>
              <p>
                <span>Email: </span>
                {eachitem.email}
              </p>
              <p>
                <span>City:</span> {eachitem.address.city}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
