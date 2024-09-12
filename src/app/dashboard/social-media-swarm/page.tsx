import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    return (
      <DashboardLayout>
        <div className="text-white text-center">Coming soon...</div>
      </DashboardLayout>
    );
  } catch (error) {
    return redirect("/");
  }
}
