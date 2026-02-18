"use client";
import React, { useState, forwardRef } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="relative flex items-center justify-center w-full h-10 rounded-lg overflow-hidden bg-gray-100 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500">
        <input
          {...props}
          ref={ref}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full h-full pl-4 pr-10 bg-transparent outline-none text-black"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
        >
          {isVisible ? <IoEye size={20} /> : <IoMdEyeOff size={20} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;