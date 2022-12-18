import "./Home.scss";
import Header from "../../components/Header/Header";

import ItemCard from "../../components/ItemCard/ItemCard";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <ItemCard />
      <Footer />
    </div>
  );
}
