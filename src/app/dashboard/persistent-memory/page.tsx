"use server";

import { redirect } from "next/navigation";
import { PersistentMemoryContainer } from "./persistent-memory-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <PersistentMemoryContainer />
      </DashboardLayout>
    );
  } catch (error) {
    console.error("Error in persistent-memory page:", error);
    return redirect("/");
  }
}
