"use client";
import PasswordInput from "@/ui/PasswordInput";
import React, { useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const { registerUser, isRegistering, registerError, error } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confrim = confirmRef.current?.value;

    if (!email || !password || !confrim) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    }

    const result = await registerUser({ email, password });

    if (result.success) {
      toast.success("Успешно!");
      router.replace("/");
    } else {
      toast.error(error || "Неверные учетные данные!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-linear-to-tr from-purple-600 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-105 p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        </div>

        {registerError && (
          <p className="text-red-500 text-sm text-center">{registerError}</p>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-10 rounded-lg text-sm font-normal transition w-2xl gap-2 text-gray-900 cursor-pointer"
          >
            <FcGoogle />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-10 rounded-lg text-sm font-normal transition w-2xl gap-2 text-gray-900 cursor-pointer"
          >
            <FaApple />
            Apple
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            ref={emailRef}
            className="bg-gray-100 h-10 rounded-lg px-4 outline-none focus:ring-2 focus:ring-purple-500 text-black"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Password</label>
          <PasswordInput
            placeholder="Enter your password"
            ref={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e as any);
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <PasswordInput placeholder="Confirm password" ref={confirmRef} />
        </div>

        <button
          disabled={isRegistering}
          className={`bg-linear-to-r from-purple-600 to-indigo-600 text-white h-10 rounded-lg font-semibold transition ${
            isRegistering ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
