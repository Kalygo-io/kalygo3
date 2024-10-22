"use server";

import { redirect } from "next/navigation";
import { HierarchicalContainer } from "@/app/dashboard/hierarchical-haitian-news-crew/hierarchical-haitian-news-crew-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { HierarchicalHaitianNewsCrewProvider } from "@/context/hierarchical-haitian-news-crew-context";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <HierarchicalHaitianNewsCrewProvider>
        <DashboardLayout>
          <HierarchicalContainer />
        </DashboardLayout>
      </HierarchicalHaitianNewsCrewProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
