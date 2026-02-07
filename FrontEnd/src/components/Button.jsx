import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-slate-800 focus:ring-primary shadow-lg shadow-primary/30",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200",
        outline: "bg-transparent text-primary border border-primary hover:bg-primary/5 focus:ring-primary",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
