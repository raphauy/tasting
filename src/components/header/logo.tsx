"use client";

import { fontNunito, fontRubik, fontSans  } from "@/lib/fonts"
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


export default function Logo() {

  return (
    <Link href="/">
      <div className="text-3xl font-bold">
        <span className="text-first-color">gabi</span>
        <span className="text-black dark:text-muted-foreground">tasting</span>
      </div>
    </Link>
  )
}
