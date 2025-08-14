import { redirect } from "next/navigation";
import { NaiveRagChatUiContainer } from "./ui-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <NaiveRagChatUiContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return <h1 className="text-white">Oops!</h1>;
  }
}
