import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingCart, Utensils } from "lucide-react";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1igQ7X5gwJW1kTjN_znKzyhoK9TmHYKnDv8epZEaHjsk/export?format=csv";

export const StatsCards = () => {
  const { data: menuItems } = useGoogleSheetData(CSV_URL);
  
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.price, 0);
  const avgPrice = menuItems.length > 0 ? Math.round(totalRevenue / menuItems.length) : 0;
  const availableItems = menuItems.filter(item => item.availability.toLowerCase() === "yes").length;

  const stats = [
    {
      title: "Total Menu Items",
      value: menuItems.length.toString(),
      icon: Utensils,
      trend: `${availableItems} available`,
      trendUp: true,
    },
    {
      title: "Avg. Item Price",
      value: `₹${avgPrice}`,
      icon: DollarSign,
      trend: "across menu",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: "4",
      icon: ShoppingCart,
      trend: "active orders",
      trendUp: true,
    },
    {
      title: "Most Expensive",
      value: `₹${Math.max(...menuItems.map(i => i.price))}`,
      icon: TrendingUp,
      trend: menuItems.find(i => i.price === Math.max(...menuItems.map(m => m.price)))?.foodItem || "",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-2 border-primary shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-primary">
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
