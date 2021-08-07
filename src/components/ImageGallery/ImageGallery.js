import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./imageGallery.module.css";

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.gallery}>
      {images.length > 0 &&
        images.map((img) => ImageGalleryItem({ ...img, onClick }))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
