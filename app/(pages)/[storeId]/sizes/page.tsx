import { SizeColumn } from "./components/columns"
import { SizeClient } from "./components/client";
import axios from 'axios';

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizesFetch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getSize`);
      return response.data
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  };

  const sizes = await sizesFetch();
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

};

export default SizesPage;