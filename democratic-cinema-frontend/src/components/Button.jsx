import React from "react";
import clsx from "clsx";

const variantClasses = {
  accent: "bg-accent hover:bg-accenthover text-white",
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
};

export const Button = ({
  variant = "accent",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "text-xs px-3 py-1 rounded transition-colors",
        variantClasses[variant] || variantClasses.accent,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;