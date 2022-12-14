import "./Home.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import ItemCard from "../../components/ItemList/ItemCard";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Search />
      <ItemCard />
      <Footer />
    </div>
  );
}
