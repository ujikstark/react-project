import { AppSidebar } from "@/pages/dashboard/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { SiteHeader } from "@/pages/dashboard/components/site-header";
import { Link, Outlet } from "react-router-dom";
import CommonProps from "@/common/interfaces/common-props.interface";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export type Page = { name: string; href: string };

interface Props extends CommonProps {
    title?: string | null;
    breadcrumbs?: Page[];
}

export function DashboardLayout(props: Props) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                {(props.breadcrumbs) &&
                                    props.breadcrumbs.length > 0 && (
                                        <Breadcrumb>
                                            <BreadcrumbList>
                                                <BreadcrumbItem>
                                                    <BreadcrumbLink>
                                                        <Link to='/dashboard'>Home</Link>
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator />
                                                {props.breadcrumbs.map((element, index, arr) => {
                                                    const isLast = index === arr.length - 1;

                                                    return isLast ? <BreadcrumbItem>
                                                        <BreadcrumbPage>
                                                            <Link to={element.href}>{element.name}</Link>
                                                        </BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                        :
                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink asChild>
                                                                <Link to={element.href}>{element.name}</Link>
                                                            </BreadcrumbLink>
                                                            <BreadcrumbSeparator />
                                                        </BreadcrumbItem>


                                                })}

                                            </BreadcrumbList>
                                        </Breadcrumb>
                                    )}

                                <div

                                    className="pt-4 dark:text-gray-100"
                                >
                                    {props.children}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </SidebarInset>
        </SidebarProvider>
    )
}