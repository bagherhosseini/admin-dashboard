"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex">
      <h1>Billboards</h1>
      <Link href="/billboards/new" legacyBehavior passHref>
      <Button>
        Create new billboard</Button>
        </Link>
    </div>
  );
}
