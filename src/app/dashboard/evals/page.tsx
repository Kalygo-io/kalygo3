"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { EvalsContainer } from "./evals-container";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <EvalsContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
