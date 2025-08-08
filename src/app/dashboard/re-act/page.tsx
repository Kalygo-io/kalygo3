import { redirect } from "next/navigation";
import { ReActContainer } from "./re-act-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <DashboardLayout>
        <ReActContainer />
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
