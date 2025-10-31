import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  status: "In Stock" | "Low" | "Out";
}

const mockIngredients: Ingredient[] = [
  { name: "Beef Patties", quantity: "50", unit: "pcs", status: "In Stock" },
  { name: "Burger Buns", quantity: "45", unit: "pcs", status: "In Stock" },
  { name: "Lettuce", quantity: "5", unit: "kg", status: "Low" },
  { name: "Tomatoes", quantity: "8", unit: "kg", status: "In Stock" },
  { name: "Cheese Slices", quantity: "0", unit: "pcs", status: "Out" },
  { name: "French Fries", quantity: "15", unit: "kg", status: "In Stock" },
];

export const IngredientsSheet = () => {
  const getStatusBadge = (status: string) => {
    if (status === "In Stock") {
      return "bg-success text-success-foreground hover:bg-success/90";
    } else if (status === "Low") {
      return "bg-warning text-warning-foreground hover:bg-warning/90";
    } else {
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    }
  };

  return (
    <Card className="border-2 border-primary shadow-lg h-full">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Ingredients 🥬</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {mockIngredients.map((ingredient, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-primary/30 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{ingredient.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {ingredient.quantity} {ingredient.unit}
                </p>
              </div>
              <Badge className={getStatusBadge(ingredient.status)}>
                {ingredient.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
