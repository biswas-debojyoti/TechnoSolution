import Image from "next/image";
import TopBar from "./component/Home/TopBar";
import Header from "./component/Home/Header";
import HomePage from "./component/Home/HomePage";
import Footer from "./component/Layout/Footer";

export default function Home() {
  return (
    <div>
      <TopBar />
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
