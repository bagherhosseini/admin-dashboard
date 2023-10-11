import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";
import axios from 'axios';
import { format } from "date-fns";

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const ordersFetch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/order", {
        storeId: params.storeId
      });
      return response.data.Orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const orders = await ordersFetch();

  const formattedOrders: OrderColumn[] = orders.map((item: OrderColumn) => ({
    id: item.id,
    products: item.products.map((orderItem) => orderItem.title).join(', '),
    isPaid: item.status,
    email: item.email,
    address: item.address,
    totalPrice: 'SEK ' + item.products.reduce((total, item) => { return total + Number(item.price) }, 0),
    createdAt: format(new Date(item.createdAt), 'do MMMM, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );

};

export default OrdersPage;