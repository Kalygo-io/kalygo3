"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { useRouter } from "next/navigation";
import { errorReporter } from "@/shared/errorReporter";
import { requestPasswordReset } from "@/services/requestPasswordReset";
import { toast } from "react-toastify";
import { successToast } from "@/shared/toasts";

export const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await requestPasswordReset(email);
      successToast("Password reset link sent to your email");
      router.push("/");
    } catch (err) {
      errorReporter(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-black rounded shadow-md">
          <div className="text-center text-3xl">🔴🔵</div>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-200">
              {CONFIG.applicationName}
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Request Password Reset
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 w-full px-3 py-2 mt-1 border border-gray-700 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request Reset Link
            </button>
          </form>
          <p className="text-sm text-center text-gray-200">
            <button
              onClick={() => router.push("/")}
              className="ml-1 font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
            >
              Back to Home
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
