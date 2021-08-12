import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import LoaderSpinner from "./components/Loader";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal/";
import apiImages from "./services/apiImages";

import s from "./App.module.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getImages = () => {
      setLoading(true);
      setShowButton(false);
      apiImages
        .fetchImages(searchQuery, page)
        .then(({ hits, total }) => {
          if (hits.length === 0) {
            setError("Sorry, search returned no results. Enter correct query.");
          }

          if (hits.length === 12 && total - 12 * page > 0) {
            setShowButton(true);
          }

          setImages((prevImages) => [...prevImages, ...hits]);
          smoothScroll();
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    if (!searchQuery) {
      return;
    }
    getImages();
  }, [page, searchQuery]);

  function handleSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError("");
    setShowButton(false);
  }

  function incrementPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function toggelModal() {
    setShowModal((prevState) => !prevState);
  }

  function handlerOnImageClick(event) {
    setImageModal(event);
    toggelModal();
  }

  const smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <LoaderSpinner />}
      {error && <p>{error}</p>}
      <ImageGallery images={images} onClick={handlerOnImageClick} />
      {showButton && <Button onLoadMore={incrementPage} />}
      {showModal && <Modal imageModal={imageModal} onClose={toggelModal} />}
    </div>
  );
}
