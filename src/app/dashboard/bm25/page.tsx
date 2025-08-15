"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { BM25DemoContainer } from "./bm25-container";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <BM25DemoContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
