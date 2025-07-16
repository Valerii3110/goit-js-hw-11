import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchGallery } from './js/pixabay-api';
import { renderGallery, clearGallery, lightbox } from './js/render-functions';
import { showLoader, hideLoader } from './js/loader';
import { refs } from './js/refs';

import './sass/index.scss';

let query = '';
let page = 1;
let totalImagesShown = 0;
const PER_PAGE = 40;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const input = event.currentTarget.elements.searchQuery;
  query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please, enter a search term',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  totalImagesShown = 0;
  clearGallery();

  await loadImages();
}

async function onLoadMore() {
  page += 1;
  await loadImages();
}

async function loadImages() {
  showLoader(); // ✅ Показуємо лоадер
  refs.loadMoreBtn.classList.add('is-hidden'); // Приховуємо кнопку до моменту перевірки

  try {
    const { hits, totalHits } = await fetchGallery(query, page);

    if (hits.length === 0 && totalImagesShown === 0) {
      iziToast.error({
        message: 'No images found',
        position: 'topRight',
      });
      return;
    }

    renderGallery(hits);
    totalImagesShown += hits.length;

    if (page === 1) {
      iziToast.success({
        message: `Hooray! Found ${totalHits} images!`,
        position: 'topRight',
      });
    }

    if (totalImagesShown < totalHits) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      iziToast.info({
        message: "You've reached the end of the search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    console.error('❌ Error:', error);
  } finally {
    hideLoader(); // ✅ Приховуємо лоадер у будь-якому випадку
  }
}
