const API_KEY = "22026737-4ace7165bbd581938b49ded93";
const BASE_URL = "https://pixabay.com/api/";

function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then((response) => {
    return response.json();
  });
}

const apiImages = {
  fetchImages,
};

export default apiImages;
