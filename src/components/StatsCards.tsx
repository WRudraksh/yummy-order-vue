import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingCart, Clock } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Today's Orders",
      value: "48",
      icon: ShoppingCart,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Revenue",
      value: "$1,245",
      icon: DollarSign,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Avg. Prep Time",
      value: "18 min",
      icon: Clock,
      trend: "-3 min",
      trendUp: true,
    },
    {
      title: "Popular Item",
      value: "Burgers",
      icon: TrendingUp,
      trend: "35 sold",
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
                  <span className={`text-sm font-semibold ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                    {stat.trend}
                  </span>
                  <span className="text-xs text-muted-foreground">vs yesterday</span>
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
