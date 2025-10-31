import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  name: string;
  price: string;
  available: boolean;
  category: string;
}

const mockMenu: MenuItem[] = [
  { name: "Classic Burger", price: "$8.99", available: true, category: "Main" },
  { name: "Cheese Fries", price: "$4.50", available: true, category: "Sides" },
  { name: "Caesar Salad", price: "$6.99", available: false, category: "Salads" },
  { name: "Margherita Pizza", price: "$12.99", available: true, category: "Main" },
  { name: "Chicken Wings", price: "$9.99", available: true, category: "Appetizers" },
  { name: "Milkshake", price: "$5.50", available: false, category: "Drinks" },
];

export const MenuDisplay = () => {
  return (
    <Card className="border-2 border-primary shadow-lg h-full">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Menu 📜</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockMenu.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-primary/30 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">{item.price}</span>
                <Badge 
                  className={
                    item.available 
                      ? "bg-success text-success-foreground hover:bg-success/90" 
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  }
                >
                  {item.available ? "Available" : "Out"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
