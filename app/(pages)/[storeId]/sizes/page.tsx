import { SizeColumn } from "./components/columns"
import { SizeClient } from "./components/client";
import axios from 'axios';
import { format } from "date-fns";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizesFetch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/getSize", {
        storeId: params.storeId
      });
      return response.data
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  };
  
  const sizes = await sizesFetch();
console.log(sizes.sizes);
  if(sizes.sizes.length !== 0) {
    const formattedSizes: SizeColumn[] = sizes.sizes.map((item: SizeColumn) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeClient data={formattedSizes} />
        </div>
      </div>
    );
  }
};

export default SizesPage;