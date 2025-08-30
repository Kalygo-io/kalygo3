"use server";

import { redirect } from "next/navigation";
import { BasicMemoryContainer } from "./basic-memory-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <BasicMemoryContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
