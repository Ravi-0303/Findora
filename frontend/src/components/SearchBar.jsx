
function SearchBar({ search, setSearch }) {

  return (
    <div className="search-container">

      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search by item name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;
