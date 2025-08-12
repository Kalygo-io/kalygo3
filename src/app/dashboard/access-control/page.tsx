"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <div className="text-white text-center">Access Control DEMO...</div>
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
