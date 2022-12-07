import "./Home.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import ItemList from "../../components/ItemList/ItemList";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Search />
      <ItemList />
      <Footer />
    </div>
  );
}
