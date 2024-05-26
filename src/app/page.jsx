import { Button, Skeleton } from "@nextui-org/react";
import DashboardTable from "./components/dashboardUI/DashboardTable";
import MyNavbar from "@/components/MyNavbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-full">
      <MyNavbar />
      <main className="bg-neutral-50 w-full flex flex-col items-center min-h-[150vh]">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-row items-center gap-8">
            <Skeleton className="w-1/2 aspect-video rounded-lg">
              <div className="w-1/2 aspect-video"></div>
            </Skeleton>
            <div className="flex flex-col gap-4 w-[30%]">
              <h1 className="text-4xl font-bold">Lorem ipsum dolor sit amet,</h1>
              <p className="text-sm text-neutral-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Ducimus eos mollitia explicabo quo molestias labore aperiam 
                consequuntur voluptas dolores porro.</p>
              <div className="flex flex-row justify-start gap-2">
                <Button color="primary" className="font-bold" as={Link} href="/patient">Pemeriksaan</Button>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-8">Recent Checkup</h2>
          <DashboardTable />
        </div>
      </main>
    </div>
  );
}
