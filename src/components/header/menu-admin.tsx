"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function MenuAdmin() {

    const path= usePathname()

    return (
        <div className="flex flex-1 gap-6 pl-5 md:gap-5 ">
            <nav>
                <ul className="flex items-center">
                    <li className={cn("flex items-center border-b-first-color hover:border-b-first-color hover:border-b-2 h-11", path.includes("admin") && "border-b-2")}>
                        <Link href="/admin"><Button className="text-lg" variant="ghost">Admin</Button></Link>
                    </li>
                    <li className={cn("flex items-center border-b-first-color hover:border-b-first-color hover:border-b-2 h-11", path.includes("overview") && "border-b-2")}>
                        <Link href={`/overview`}><Button className="text-lg" variant="ghost">Overview</Button></Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
