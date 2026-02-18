"use client";
import { useStore } from "@/store/useStore";
import PasswordInput from "@/ui/PasswordInput";
import { useRouter } from "next/navigation";
import { useRef } from "react"; 
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { loginUser, error } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    }

    const result = await loginUser({ email, password });

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
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to login.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-10 rounded-lg text-sm transition w-full gap-2 text-gray-900 cursor-pointer"
          >
            <FcGoogle /> Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-10 rounded-lg text-sm transition w-full gap-2 text-gray-900 cursor-pointer"
          >
            <FaApple /> Apple
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
            ref={emailRef} 
            type="email"
            placeholder="Enter your Email"
            className="bg-gray-100 h-10 rounded-lg px-4 outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Password</label>
          <PasswordInput
            ref={passwordRef} 
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition text-white h-10 rounded-lg font-semibold"
        >
          Log In
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
