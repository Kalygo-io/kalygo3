"use server";

import { redirect } from "next/navigation";
import { HierarchicalContainer } from "@/app/dashboard/hierarchical/hierarchical-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { HierarchicalProvider } from "@/context/hierarchical-context";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <HierarchicalProvider>
        <DashboardLayout>
          <HierarchicalContainer />
        </DashboardLayout>
      </HierarchicalProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
