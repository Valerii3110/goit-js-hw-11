import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import NewsApiService from './js/pixabay-api';
import { renderGallery, clearGallery, lightbox } from './js/render-functions';
import { showLoader, hideLoader } from './js/loader';
import { refs } from './js/refs';

import './sass/index.scss';

let isShown = 0;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  clearGallery();

  const input = event.currentTarget.querySelector('input[name="searchQuery"]');
  if (!input) {
    console.error('⛔️ Input [name="searchQuery"] not found');
    return;
  }

  newsApiService.query = input.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    iziToast.warning({
      message: 'Please, fill the main field',
      position: 'topRight',
    });
    return;
  }

  isShown = 0;
  await fetchGallery();
}

async function onLoadMore() {
  newsApiService.incrementPage();
  await fetchGallery();
}

async function fetchGallery() {
  refs.loadMoreBtn.classList.add('is-hidden');
  showLoader();

  try {
    const result = await newsApiService.fetchGallery();
    const { hits, total } = result;

    if (!hits.length) {
      iziToast.error({
        message: 'Sorry, no images found.',
        position: 'topRight',
      });
      return null;
    }

    renderGallery(hits);
    isShown += hits.length;

    if (isShown < total) {
      iziToast.success({
        message: `Hooray! Found ${total} images!`,
        position: 'topRight',
      });
      refs.loadMoreBtn.classList.remove('is-hidden');
    }

    if (isShown >= total) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }

    return hits;
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('❌ Error fetching gallery:', error);
  } finally {
    hideLoader();
  }
}
