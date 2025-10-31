import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  customerName: string;
  items: string;
  status: "Pending" | "Delivered";
  total: string;
  time: string;
}

const mockOrders: Order[] = [
  { id: "001", customerName: "John Doe", items: "Chicken burger", status: "Pending", total: "₹120", time: "10:30 AM" },
  { id: "002", customerName: "Jane Smith", items: "Paneer burger, French Fries", status: "Delivered", total: "₹140", time: "10:15 AM" },
  { id: "003", customerName: "Mike Johnson", items: "Cheese Fries", status: "Pending", total: "₹65", time: "10:45 AM" },
  { id: "004", customerName: "Sarah Williams", items: "Aloo tikki burger", status: "Delivered", total: "₹60", time: "10:00 AM" },
];

export const OrdersTable = () => {
  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Live Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">#{order.id}</td>
                  <td className="py-3 px-4 text-foreground">{order.customerName}</td>
                  <td className="py-3 px-4 text-foreground">{order.items}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        order.status === "Delivered" 
                          ? "bg-success text-success-foreground hover:bg-success/90" 
                          : "bg-warning text-warning-foreground hover:bg-warning/90"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground">{order.total}</td>
                  <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
