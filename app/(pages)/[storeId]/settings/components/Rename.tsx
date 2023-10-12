"use client";

import React from 'react'
import { useState, useEffect} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Rename() {
  const [storeName, setStoreName] = useState<string | null>(null);

  useEffect(() => {
    // Get the storeId from the current URL
    const pathSegments = window.location.pathname.split('/');
  
    const storeId = pathSegments[1];

  if (!storeId) {
    console.error('Store ID not found in the URL.');
    return;
  }
  
    // Define the async function within useEffect
    const fetchStoreName = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getStoreNameById?storeId=${storeId}`);
        const data = await response.json();
        console.log(data);
  
        if (data && data.name) {
          setStoreName(data.name);
        } else {
          console.error('Error fetching store name:', data);
        }
      } catch (error) {
        console.error('Error fetching store name:', error);
      }
    };
  
    // Call the async function
    fetchStoreName();
  
  }, []); 
  return (
    <div className="space-y-8 w-full">
      <form className="space-y-8 w-full">
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <Input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={storeName || "Loading..."} />
          </div>
        </div>
        <Button type="submit">Save Changes</Button>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
      </form>
    </div>
  );
}
