import { CategoryColumn } from "./components/columns"
import { CategoryClient } from "./components/client";
import axios from 'axios';

const CategoryPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const categoriesFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getCategory`);
      return response.data
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  };

  const categories = await categoriesFetch();

  const formattedCategories: CategoryColumn[] = categories.categories.map((item: CategoryColumn) => ({
    id: item.id,
    name: item.name,
    description: item.description,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};
export default CategoryPage;