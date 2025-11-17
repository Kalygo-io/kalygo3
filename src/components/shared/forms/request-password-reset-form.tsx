"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { useRouter } from "next/navigation";
import { errorReporter } from "@/shared/errorReporter";
import { requestPasswordReset } from "@/services/requestPasswordReset";
import { successToast } from "@/shared/toasts";
import { Spinner } from "@/components/shared/common/spinner";
import Link from "next/link";
import { ArrowLeftIcon, KeyIcon } from "@heroicons/react/24/outline";

export const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await requestPasswordReset(email);
      successToast("Password reset link sent to your email");
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      errorReporter(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to home</span>
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4">
            <KeyIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {CONFIG.applicationName}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-300">
            Reset Password
          </h2>
          <p className="text-gray-400 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : "Send Reset Link"}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-sm text-center text-gray-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
