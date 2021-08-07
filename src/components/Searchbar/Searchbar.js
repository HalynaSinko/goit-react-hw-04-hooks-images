import { Component } from "react";
import PropTypes from "prop-types";

import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };
  handleChangeInput = (event) => {
    // console.log(event.target.value);
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (searchQuery.trim() === "") {
      return;
    }

    onSubmit(searchQuery);

    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: "" });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={s.button}>
            <span className="label"></span>
          </button>

          <input
            className={s.input}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
