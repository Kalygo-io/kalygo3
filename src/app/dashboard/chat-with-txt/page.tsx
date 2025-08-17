import { redirect } from "next/navigation";
import { RerankingChatUiContainer } from "./ui-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <RerankingChatUiContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
