"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { errorReporter } from "@/shared/errorReporter";
import { requestPasswordReset } from "@/services/requestPasswordReset";
import { resetPassword } from "@/services/resetPassword";

export const ResetPasswordForm = () => {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const searchParams = useSearchParams();

  const accountId = searchParams.get("account-id");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      console.log("->->-> resetToken <-<-<-", resetToken);

      await resetPassword(Number.parseInt(accountId!), resetToken, newPassword);

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
            Reset Password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="reset-token"
                className="block text-sm font-medium text-gray-200"
              >
                Token
              </label>
              <input
                type="text"
                id="reset-token"
                name="reset-token"
                autoComplete="reset-token"
                placeholder="Enter Reset Token"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="bg-gray-800 w-full px-3 py-2 mt-1 border border-gray-700 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-200"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-gray-800 w-full px-3 py-2 mt-1 border border-gray-700 text-gray-200 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
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
