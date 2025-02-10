
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Preview } from "@/components/preview/Preview";

const Index = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1">
            <Preview />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
