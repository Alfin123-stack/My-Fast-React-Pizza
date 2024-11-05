import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type }) {
  const className =
    "bg-yellow-400 font-semibold text-stone-800 rounded-full uppercase hover:bg-yellow-300 transition-colors focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    large: className + " px-3 py-2 sm:px-6 sm:py-4 text-lg",
    small: className + " px-2 py-1 sm:px-4 sm:py-2 text-xs",
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
