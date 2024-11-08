import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type }) {
  const base =
    "bg-yellow-400 font-semibold text-stone-800 rounded-full uppercase hover:bg-yellow-300 transition-colors focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const secondary =
    "border-[1px] border-stone-400 font-semibold text-stone-800 rounded-full uppercase hover:bg-stone-300 transition-colors focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-3 py-2 sm:px-4 sm:py-3  text-sm";

  const styles = {
    large: base + " px-3 py-2 sm:px-6 sm:py-4  text-sm",
    small: base + " px-2 py-1 sm:px-4 sm:py-2  text-xs",
    secondary: secondary,
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
