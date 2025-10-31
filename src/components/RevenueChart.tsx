import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";

const CSV_URL = "https://docs.google.com/spreadsheets/d/1igQ7X5gwJW1kTjN_znKzyhoK9TmHYKnDv8epZEaHjsk/export?format=csv";

export const RevenueChart = () => {
  const { data: menuItems } = useGoogleSheetData(CSV_URL);

  const chartData = menuItems.map(item => ({
    name: item.foodItem,
    revenue: item.price,
  }));

  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="text-2xl font-bold text-foreground">Revenue by Item</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip 
              formatter={(value) => `₹${value}`}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--primary))' 
              }}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
