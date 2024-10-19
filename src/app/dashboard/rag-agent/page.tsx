import { redirect } from "next/navigation";
import { RagAgentUiContainer } from "./ui-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <RagAgentUiContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return <h1 className="text-white">Oops!</h1>;
  }
}
