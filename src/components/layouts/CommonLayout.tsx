import type { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

interface IProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col space-y-6 md:space-y-10 lg:space-y-12">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
