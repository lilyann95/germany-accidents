import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw]">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
