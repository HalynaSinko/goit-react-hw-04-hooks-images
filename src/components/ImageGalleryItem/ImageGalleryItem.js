import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <li key={id} className={s.item}>
      <img
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        className={s.image}
        onClick={(event) => onClick(event.currentTarget)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
