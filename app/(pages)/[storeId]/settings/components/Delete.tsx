"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaTrash } from 'react-icons/fa';
import { toast } from "react-hot-toast";

export function DeleteButton() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId;

  const handleDelete = async () => {
    if(!storeId) return; 

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteStore`, {
        data: {
          storeId: storeId
        },
      });

      // Provide a success message to the user
      toast.success("Store successfully deleted!");
      // Redirect the page
      router.push("/");
    } catch (error) {
      console.error("Error deleting the store:", error);
      toast.error("Error deleting the store")
    }
  };

  return (
    <Button className="some-styles-if-needed" variant="destructive" onClick={handleDelete}>
      <FaTrash size={18} />
    </Button>
  );
}
