"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { VectorsDemoContainer } from "./vectors-container";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <VectorsDemoContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
