"use client";

import { useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export function Rename() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId;
  const [storeName, setStoreName] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    (async function fetchData() {
      if (!storeId) {
        console.error('Store ID not found in the URL.');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getStoreNameById?storeId=${storeId}`);
        const data = await response.json();

        if (data && data.name) {
          setStoreName(data.name);
          setLoaded(true);  // Set loaded to true after fetching data
        } else {
          console.error('Error fetching store name:', data);
        }
      } catch (error) {
        console.error('Error fetching store name:', error);
      }
    })();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (storeId && storeName) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/renameStore`, 
        { 
          storeId,
          name: storeName 
          }
          );
        
        // Handle the response as needed
        if (response.status === 200) {
          toast.success("Store successfully renamed!");
          setStoreName(storeName);
        }
      } catch (error) {
        console.error('Error updating store name:', error);
        toast.error("Error updating store name")
      }
    }
  };


  return (
    <div className="space-y-8 w-full">
      <form onSubmit={handleFormSubmit} className="space-y-8 w-full">
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <Input 
              value={storeName || ''}
              onChange={handleInputChange}
              className="..."
              placeholder={storeName || "Loading..."} 
            />
          </div>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}