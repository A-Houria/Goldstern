import Style from "../../styles/NoPage/Nopage.module.css";

const Nopage = () => {
  return (
    <div className={Style.nopage}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/">Go Back Home</a>
    </div>
  );
};

export default Nopage;
