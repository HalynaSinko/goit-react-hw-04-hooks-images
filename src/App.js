import { Component } from "react";
import Searchbar from "./Components/Searchbar";
import LoaderSpinner from "./Components/Loader";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal/";
import apiImages from "./serveces/apiImages";

import s from "./App.module.css";

class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    loading: false,
    showButtom: false,
    showModal: false,
    imageModal: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    const { searchQuery } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.getImages();
    }
  }

  getImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    setTimeout(() => {
      apiImages
        .fetchImages(searchQuery, page)
        .then(({ hits }) => {
          // console.log(hits);

          if (hits.length === 0) {
            this.setState({
              error: "Sorry, search returned no results. Enter correct query.",
            });
          }

          if (hits.length !== 12) {
            this.setState({ showButtom: false });
          } else {
            this.setState({ showButtom: true });
          }

          this.setState((prevState) => ({
            images: [...prevState.images, ...hits],
            page: prevState.page + 1,
          }));
          this.smoothScroll();
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }, 1000);
  };

  smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  hendleSubmit = (searchQuery) => {
    this.setState({ searchQuery, images: [], page: 1, error: "" });
  };

  toggelModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  hendleOnImageClick = (event) => {
    this.setState({ imageModal: event });
    this.toggelModal();
  };

  render() {
    const { images, loading, showButtom, showModal, imageModal, error } =
      this.state;
    return (
      <div className={s.container}>
        <Searchbar onSubmit={this.hendleSubmit} />
        {loading && <LoaderSpinner />}
        {error && <p>{error}</p>}
        <ImageGallery images={images} onClick={this.hendleOnImageClick} />
        {showButtom && <Button onLoadMore={this.getImages} />}
        {showModal && (
          <Modal imageModal={imageModal} onClose={this.toggelModal} />
        )}
      </div>
    );
  }
}

export default App;
