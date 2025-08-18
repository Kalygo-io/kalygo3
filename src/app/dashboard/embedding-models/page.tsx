"use server";

import { redirect } from "next/navigation";
import { EmbeddingModelsContainer } from "./embedding-models-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <EmbeddingModelsContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
