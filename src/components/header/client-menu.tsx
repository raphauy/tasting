import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";

export default async function ClientsMenu() {
    const user= await getCurrentUser()
    if (!user) return <div>Client not found</div>

    return <div>Client menu not implemented</div>
}
