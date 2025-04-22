import { AppSidebar } from "@/pages/dashboard/components/app-sidebar"
import { ChartAreaInteractive } from "@/pages/dashboard/components/chart-area-interactive"
import { DataTable } from "@/pages/dashboard/components/data-table"
import { SectionCards } from "@/pages/dashboard/components/section-cards"
import { SiteHeader } from "@/pages/dashboard/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
export function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                {/* <ChartAreaInteractive /> */}
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}