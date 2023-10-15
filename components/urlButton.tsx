"use client";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ApiUrlProps {
    url:string
  };

export const UrlButton: React.FC<ApiUrlProps> = ({
    url
  }) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to clipboard.");
      }
  return (
    <Button onClick={() => onCopy(url)} type="submit">Copy</Button>
  )
}
