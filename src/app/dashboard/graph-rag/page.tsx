"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { GraphRAGDemoContainer } from "./graph-rag-container";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <GraphRAGDemoContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
