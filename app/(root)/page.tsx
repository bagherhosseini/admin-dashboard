"use client";
import StoreDialog from "@/components/storeDialog";
import { useState } from "react";

const Page = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    return <StoreDialog isOpen={true} setIsOpen={setIsOpen} />
};

export default Page;