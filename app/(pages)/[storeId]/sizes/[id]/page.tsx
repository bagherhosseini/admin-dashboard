import prismadb from "@/lib/prismadb";

import { SizeForm } from "./form";
import { parse } from "path";

const SizePage = async ({
  params
}: {
  params: { id: number }
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: parseInt(params.id.toString())
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;