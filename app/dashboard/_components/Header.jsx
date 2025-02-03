"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        className="cursor-pointer"
        src={"/logo.svg"}
        width={50}
        height={50}
        alt="Logo"
        onClick={() => router.push("/dashboard")} // Logo navigates to dashboard
      />
      <ul className="hidden md:flex gap-6">
        <li
          onClick={() => router.push("/dashboard")}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == "/dashboard" && "text-primary font-bold"}`}
        >
          Dashboard
        </li>
        <li
          onClick={() => router.push("/dashboard/questions")}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == "/dashboard/questions" && "text-primary font-bold"}`}
        >
          Questions
        </li>
        <li
          onClick={() => router.push("/dashboard/upgrade")}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == "/dashboard/upgrade" && "text-primary font-bold"}`}
        >
          Upgrade
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
