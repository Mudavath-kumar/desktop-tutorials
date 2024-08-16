const form = document.getElementById('search-form');
const input = document.getElementById('search-query');
const resultsContainer = document.getElementById('results');

const accessKey = 'jfuVYEw0fmm3Pgpha-rJAj03RIt21KmgsHy92QwJkk8';
const apiUrl = `https://api.unsplash.com/search/photos?per_page=12&query=`;

async function fetchImages(query) {
  try {
    const response = await fetch(`${apiUrl}${query}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
}

function displayImages(images) {
  resultsContainer.innerHTML = '';
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    resultsContainer.appendChild(imgElement);
  });
  showMoreBtn.style.display="block";
}

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const query = input.value;
  if (query.trim() !== '') {
    const images = await fetchImages(query);
    displayImages(images);
  }
});
