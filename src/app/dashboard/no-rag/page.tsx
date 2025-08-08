"use server";

import { redirect } from "next/navigation";
import { NoRagContainer } from "./no-rag-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <NoRagContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
