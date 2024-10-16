"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { registerAccount } from "@/services/registerAccount";
import { loginRequest } from "@/services/loginRequest";
import { errorReporter } from "@/shared/errorReporter";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/shared/common/spinner";
import { sleep } from "../utils/sleep";

export const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await loginRequest(email, password);
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      errorReporter(err);
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await registerAccount(registerEmail, registerPassword);
      console.log("after registerAccount...");
      await loginRequest(registerEmail, registerPassword);
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      errorReporter(err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleResetPassword = () => {
    router.push("/request-password-reset");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-black rounded shadow-md">
          <div className="text-center text-3xl">🔵</div>
          <div className="mb-6 text-center">
            <h1 className="text-3xl uppercase font-bold text-gray-200">
              {CONFIG.applicationName}
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-200">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form
            className="space-y-6"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={isLogin ? email : registerEmail}
                onChange={
                  isLogin
                    ? (e) => setEmail(e.target.value)
                    : (e) => setRegisterEmail(e.target.value)
                }
                required
                className="bg-gray-800 w-full px-3 py-2 mt-1 border border-gray-700 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={isLogin ? password : registerPassword}
                onChange={
                  isLogin
                    ? (e) => setPassword(e.target.value)
                    : (e) => setRegisterPassword(e.target.value)
                }
                required
                className="bg-gray-800 w-full px-3 py-2 mt-1 border border-gray-700 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? <Spinner /> : isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="space-y-2 py-2">
            <p className="text-sm text-center text-gray-200">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="ml-1 font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
            <p className="text-sm text-center text-gray-200">
              {isLogin && (
                <>
                  {isLogin ? "Forgot your password?" : ""}
                  <button
                    onClick={handleResetPassword}
                    className="ml-1 font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
                  >
                    Reset
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
