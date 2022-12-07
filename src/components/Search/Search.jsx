import "../Search/Search.scss";

export default function Search() {
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="What are you looking for today?"
      />
    </div>
  );
}
