import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full">
        <Navbar />
      </div>
      <main className="h-full pt-[80px]">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default RootLayout;
