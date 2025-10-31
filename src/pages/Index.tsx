import { OrdersTable } from "@/components/OrdersTable";
import { MenuDisplay } from "@/components/MenuDisplay";
import { IngredientsSheet } from "@/components/IngredientsSheet";
import { StatsCards } from "@/components/StatsCards";
import burgerArt from "@/assets/burger-art.png";
import friesArt from "@/assets/fries-art.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative images */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <img 
          src={burgerArt} 
          alt="" 
          className="absolute top-20 right-10 w-64 h-auto rotate-12"
        />
        <img 
          src={friesArt} 
          alt="" 
          className="absolute bottom-20 left-10 w-48 h-auto -rotate-12"
        />
        <img 
          src={burgerArt} 
          alt="" 
          className="absolute bottom-40 right-1/4 w-40 h-auto rotate-45 opacity-50"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
            Restaurant Dashboard
            <span className="text-6xl">🍔</span>
          </h1>
          <p className="text-muted-foreground text-lg">Live order tracking and inventory management</p>
        </header>

        {/* Orders Section - Full Width Top */}
        <div className="mb-8">
          <OrdersTable />
        </div>

        {/* Menu and Ingredients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MenuDisplay />
          <IngredientsSheet />
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Today's Insights 📊</h2>
          <StatsCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
