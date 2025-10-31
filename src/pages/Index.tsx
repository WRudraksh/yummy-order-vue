import { OrdersTable } from "@/components/OrdersTable";
import { MenuDisplay } from "@/components/MenuDisplay";
import { IngredientsSheet } from "@/components/IngredientsSheet";
import { StatsCards } from "@/components/StatsCards";
import { Chatbot } from "@/components/Chatbot";
import { RevenueChart } from "@/components/RevenueChart";
import burgerDoodle from "@/assets/burger-doodle.png";
import friesDoodle from "@/assets/fries-doodle.png";
import pizzaDoodle from "@/assets/pizza-doodle.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative doodles */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <img 
          src={burgerDoodle} 
          alt="" 
          className="absolute top-20 right-10 w-48 h-auto rotate-12"
        />
        <img 
          src={friesDoodle} 
          alt="" 
          className="absolute bottom-20 left-10 w-40 h-auto -rotate-12"
        />
        <img 
          src={pizzaDoodle} 
          alt="" 
          className="absolute top-1/2 left-1/4 w-32 h-auto rotate-45"
        />
        <img 
          src={burgerDoodle} 
          alt="" 
          className="absolute bottom-40 right-1/4 w-36 h-auto -rotate-12"
        />
        <img 
          src={friesDoodle} 
          alt="" 
          className="absolute top-1/3 right-1/3 w-32 h-auto rotate-90"
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Insights & Analytics</h2>
          <StatsCards />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <RevenueChart />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
