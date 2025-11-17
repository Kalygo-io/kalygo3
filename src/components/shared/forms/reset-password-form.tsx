"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { errorReporter } from "@/shared/errorReporter";
import { resetPassword } from "@/services/resetPassword";
import { Spinner } from "@/components/shared/common/spinner";
import Link from "next/link";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { successToast } from "@/shared/toasts";

export const ResetPasswordForm = () => {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const accountId = searchParams.get("account-id");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      console.log("->->-> resetToken <-<-<-", resetToken);

      await resetPassword(Number.parseInt(accountId!), resetToken, newPassword);
      
      successToast("Password reset successfully! You can now sign in.");
      router.push("/login");
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
            <LockClosedIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {CONFIG.applicationName}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-300">
            Set New Password
          </h2>
          <p className="text-gray-400 mt-2">
            Enter your reset token and choose a new password
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="reset-token"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Reset Token
            </label>
            <input
              type="text"
              id="reset-token"
              name="reset-token"
              autoComplete="reset-token"
              placeholder="Enter reset token from email"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
              className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              autoComplete="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-gray-900/50 w-full px-4 py-3 border border-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : "Reset Password"}
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
