"use client"

import { cn } from "@/lib/utils";
import { ClipboardPasteIcon, Grape, LayoutDashboard, Scan, Settings, User, Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data= [
  {
    href: "/admin",
    icon: LayoutDashboard,
    text: "Dashboard"
  },
  {
    href: "divider", icon: User
  },
  {
    href: "/admin/users",
    icon: User,
    text: "Users"
  },
  {
    href: "divider", icon: User
  },  
  {
    href: "/admin/producers",
    icon: Grape,
    text: "Producers"
  },  
  {
    href: "/admin/wines",
    icon: Wine,
    text: "Wines"
  },
  {
    href: "/admin/tastings",
    icon: ClipboardPasteIcon,
    text: "Tastings"
  },
  {
    href: "divider", icon: User
  },
  {
    href: "/overview",
    icon: Scan,
    text: "Overview"
  },
]


export default function SideBar() {

  const path= usePathname()

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black"
  const selectedClasses= "font-bold text-osom-color dark:border-r-white"


  return (
    <div className="flex flex-col justify-between border-r border-r-osom-color/50">
      <section className="flex flex-col gap-3 py-4 mt-3 ">
        {data.map(({ href, icon: Icon, text }, index) => {
          if (href === "divider") return divider(index)
          
          const selected= path.endsWith(href)
          const classes= cn(commonClasses, selected && selectedClasses)
          return (
            <Link href={href} key={href} className={classes}>
              <Icon size={23} />
              <p className="hidden sm:block lg:w-36">{text}</p>                  
            </Link>
          )
        })}

        {/* <Link href="/admin" className={dashboard}>
          <LayoutDashboard size={23} />
          <p className={pClasses}>Dashboard</p>                  
        </Link> */}

        {divider()}



      </section>
      <section className="mb-4">
        {divider()}
        
        <Link href="/admin/config" className="flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black">
          <Settings />
          <p className="hidden sm:block lg:w-36">Config</p>                  
        </Link>
      </section>
    </div>
  );
}


function divider(key?: number) {
  return <div key={key} className="mx-2 my-5 border-b border-b-osom-color/50" />
}
