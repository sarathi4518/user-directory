import { useNavigate } from "react-router-dom";
import errorimg from "../Home/error--img.png";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <div className="error-container">
      <img src={errorimg} alt="Error" className="error-image" />
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-text">The page you’re looking for doesn’t exist.</p>
      <button onClick={() => handleGoBack()} className="retry-button">
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
