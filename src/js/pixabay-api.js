import axios from 'axios';

const API_KEY = '51318694-35374bea804290f3a0783253d';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function fetchGallery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching data from Pixabay:', error);
    throw error;
  }
}
