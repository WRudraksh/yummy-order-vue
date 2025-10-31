import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1igQ7X5gwJW1kTjN_znKzyhoK9TmHYKnDv8epZEaHjsk/export?format=csv";

interface Ingredient {
  name: string;
  count: number;
  status: "In Stock" | "Low";
}

export const IngredientsSheet = () => {
  const { data: menuItems, loading, error } = useGoogleSheetData(CSV_URL);

  const getIngredients = (): Ingredient[] => {
    const ingredientMap = new Map<string, number>();
    
    menuItems.forEach(item => {
      const ingredients = item.ingredients.split(',').map(i => i.trim());
      ingredients.forEach(ingredient => {
        ingredientMap.set(ingredient, (ingredientMap.get(ingredient) || 0) + 1);
      });
    });

    return Array.from(ingredientMap.entries()).map(([name, count]) => ({
      name,
      count,
      status: count > 3 ? "In Stock" : "Low"
    }));
  };

  const ingredients = getIngredients();

  return (
    <Card className="border-2 border-primary shadow-lg h-full">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Ingredients</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading && <p className="text-muted-foreground">Loading ingredients...</p>}
        {error && <p className="text-destructive">{error}</p>}
        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-primary/30 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{ingredient.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Used in {ingredient.count} items
                </p>
              </div>
              <Badge className={
                ingredient.status === "In Stock"
                  ? "bg-success text-success-foreground hover:bg-success/90"
                  : "bg-warning text-warning-foreground hover:bg-warning/90"
              }>
                {ingredient.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
