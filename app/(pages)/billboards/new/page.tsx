"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 flex flex-col">
      <Label htmlFor="picture">Lägg till en bild</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
