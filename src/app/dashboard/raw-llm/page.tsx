"use server";

import { redirect } from "next/navigation";
import { RawLLMContainer } from "./raw-llm-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <RawLLMContainer />
      </DashboardLayout>
    );
  } catch (error) {
    console.log("! error !", error);
    return <h1 className="text-white">Oops!</h1>;
  }
}
