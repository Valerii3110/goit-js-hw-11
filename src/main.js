import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import NewsApiService from './js/pixabay-api';
import { lightbox } from './js/render-functions';
import './sass/index.scss';

const refs = {
  searchForm: document.querySelector('.form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let isShown = 0;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// ───────────────────────────────────────

async function onSearch(event) {
  event.preventDefault();
  refs.galleryContainer.innerHTML = '';

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
  }
}

function renderGallery(elements) {
  const markup = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item"><b>Likes</b> ${likes}</p>
      <p class="info-item"><b>Views</b> ${views}</p>
      <p class="info-item"><b>Comments</b> ${comments}</p>
      <p class="info-item"><b>Downloads</b> ${downloads}</p>
    </div>
  </div>`;
      }
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
