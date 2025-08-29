"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { FineTuningContainer } from "./fine-tuning-container";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <FineTuningContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
