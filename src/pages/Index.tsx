
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Preview } from "@/components/preview/Preview";

const Index = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
};

export default Index;
