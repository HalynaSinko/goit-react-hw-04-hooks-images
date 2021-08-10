import { useState } from "react";
import PropTypes from "prop-types";

import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeInput = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={s.button}>
          <span className="label"></span>
        </button>

        <input
          className={s.input}
          name="searchQuery"
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
