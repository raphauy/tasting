
import { getCurrentUser } from "@/lib/auth";
import MenuAdmin from "./menu-admin";

export default async function Menu() {
    
    const user= await getCurrentUser()

    if (!user) return <div></div>

    if (user.role === "admin") {
        return (
            <div className="flex">
                <div className="flex items-center">
                    <p className="ml-1 text-2xl hidden sm:block">/</p>
                    <MenuAdmin />
                </div>
            </div>
        )
    }

    return <div></div>
}
