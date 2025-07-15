export function showLoader() {
  document.querySelector('.preloader')?.classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.preloader')?.classList.add('is-hidden');
}
