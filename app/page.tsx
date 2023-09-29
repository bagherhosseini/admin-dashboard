"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";

export default function Home() {
  const [state, setState] = useState<string>("");

  const apiReq = async () => {
    const res = await fetch("/api/PostDataDB", {
      method: "POST",
      body: JSON.stringify({
        title: "TEST2",
        price: 100,
        description: "test2",
        img: "scam",
      }),
    });
    const json = await res.json();
    // setState(json);
    console.log(json);
  };

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <button onClick={apiReq}>click</button>
      <input type="text" name="" id="" />
      {/* <p>{state}</p> */}
    </div>
  );
}
