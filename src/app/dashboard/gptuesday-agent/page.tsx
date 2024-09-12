import { redirect } from "next/navigation";
import { GptuesdayAgentUiContainer } from "./ui-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    return (
      <DashboardLayout>
        <GptuesdayAgentUiContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
