import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";
import { useMemo } from "react";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1igQ7X5gwJW1kTjN_znKzyhoK9TmHYKnDv8epZEaHjsk/export?format=csv";

interface Order {
  id: number;
  customerName: string;
  items: string;
  status: "Pending" | "Delivered";
  total: number;
  time: string;
}

export const OrdersTable = () => {
  const { data: menuItems, loading } = useGoogleSheetData(CSV_URL);

  const orders = useMemo(() => {
    if (menuItems.length === 0) return [];
    
    const customerNames = ["Rahul Sharma", "Priya Patel", "Amit Kumar", "Neha Singh", "Vikram Reddy"];
    const statuses: ("Pending" | "Delivered")[] = ["Pending", "Delivered"];
    const times = ["2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM"];
    
    return Array.from({ length: 5 }, (_, i) => {
      const numItems = Math.floor(Math.random() * 2) + 1;
      const selectedItems = [];
      const itemsSet = new Set();
      
      while (selectedItems.length < numItems) {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        if (!itemsSet.has(randomItem.foodItem)) {
          selectedItems.push(randomItem);
          itemsSet.add(randomItem.foodItem);
        }
      }
      
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      
      return {
        id: i + 1,
        customerName: customerNames[i % customerNames.length],
        items: selectedItems.map(item => item.foodItem).join(", "),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        total,
        time: times[i % times.length]
      };
    });
  }, [menuItems]);

  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Live Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading && <p className="text-muted-foreground">Loading orders...</p>}
        {!loading && orders.length === 0 && <p className="text-muted-foreground">No orders yet</p>}
        {!loading && orders.length > 0 && (
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
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">#{order.id.toString().padStart(3, '0')}</td>
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
                    <td className="py-3 px-4 font-semibold text-foreground">₹{order.total}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
