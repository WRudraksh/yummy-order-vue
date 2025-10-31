import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1igQ7X5gwJW1kTjN_znKzyhoK9TmHYKnDv8epZEaHjsk/export?format=csv";

export const MenuDisplay = () => {
  const { data: menuItems, loading, error } = useGoogleSheetData(CSV_URL);

  return (
    <Card className="border-2 border-primary shadow-lg h-full">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Menu</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading && <p className="text-muted-foreground">Loading menu...</p>}
        {error && <p className="text-destructive">{error}</p>}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-primary/30 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.foodItem}</h4>
                <p className="text-sm text-muted-foreground">{item.ingredients}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">₹{item.price}</span>
                <Badge 
                  className={
                    item.availability.toLowerCase() === "yes"
                      ? "bg-success text-success-foreground hover:bg-success/90" 
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  }
                >
                  {item.availability.toLowerCase() === "yes" ? "Available" : "Out"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
