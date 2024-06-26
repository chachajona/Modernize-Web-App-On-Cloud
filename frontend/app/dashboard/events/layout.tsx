"use client";

import { usePathname } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const EventLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const breadcrumbPage = useMemo(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    if (pathSegments.length === 2) {
      return pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1);
    }
    return "All";
  }, [pathname]);

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Event Booking" className="px-5 md:px-0" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events Booking</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {breadcrumbPage}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link href="/events/music" passHref>
                    <DropdownMenuItem>Music</DropdownMenuItem>
                  </Link>
                  <Link href="/events/sports" passHref>
                    <DropdownMenuItem>Sports</DropdownMenuItem>
                  </Link>
                  <Link href="/events/cuisine" passHref>
                    <DropdownMenuItem>Cuisine</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};

export default EventLayout;