import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main>
      <h2>Page Not Found</h2>
      <p>Sorry, Watchoor.</p>
      <p>
        <Link to="/home">Visit the Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;
