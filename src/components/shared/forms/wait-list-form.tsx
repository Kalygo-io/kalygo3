"use client";

import { useState } from "react";
import { CONFIG } from "@/config";
import { joinWaitList } from "@/services/joinWaitList";
import { errorReporter } from "@/shared/errorReporter";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/shared/common/spinner";
import { sleep } from "../utils/sleep";
import { successToast } from "@/shared/toasts";

export const WaitListForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleJoinWaitlist = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await joinWaitList(email);
      console.log("after joinWaitingList...");
      setEmail("");
      setIsLoading(false);
      successToast("You are now on the Kalygo waitlist!");
    } catch (err) {
      setIsLoading(false);
      errorReporter(err);
    }
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
            Waitlist
          </h2>
          <form className="space-y-6" onSubmit={handleJoinWaitlist}>
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
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? <Spinner /> : "Join Waitlist"}
            </button>
          </form>
          {/* <div className="space-y-2 py-2">
            <p className="text-sm text-center text-gray-200">
              Visit
              <button
                onClick={() => window.open("https://kalygo.xyz", "_blank")}
                className="ml-1 font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
              >
                Kalygo 1.0
              </button>
            </p>
            <p className="text-sm text-center text-gray-200">
              Visit
              <button
                onClick={() => window.open("https://kalygo.io", "_blank")}
                className="ml-1 font-medium text-blue-200 hover:text-blue-300 focus:outline-none"
              >
                Kalygo 2.0
              </button>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};
