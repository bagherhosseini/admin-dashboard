import { BillboardColumn } from "./components/columns";
import { BillboardClient } from "./components/client";
import axios from "axios";
import { format } from "date-fns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboardFetch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/getBillboard",
        {
          storeId: params.storeId,
        }
      );
      console.log(response.data.billboard);
      return response.data.billboard;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const billboards = await billboardFetch();

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (item: BillboardColumn) => ({
      id: item.id,
      title: item.title,
      createdAt: format(new Date(item.createdAt), "do MMMM, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
