import{a as g,S as y,i as d}from"./assets/vendor-BDlA6vKe.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();class b{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=40}async fetchGallery(){const e={method:"get",url:"https://pixabay.com/api/",params:{key:"51318694-35374bea804290f3a0783253d",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:`${this.page}`,per_page:`${this.PER_PAGE}`}};try{const n=(await g(e)).data;return this.incrementPage(),n}catch(s){console.error(s)}}incrementPage(){this.page+=1}resetPage(){this.page=1}resetEndOfHits(){this.endOfHits=!1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}}let v=new y(".photo-card a",{captions:!0,captionsData:"alt",captionDelay:250});const i={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=0;const l=new b;i.searchForm.addEventListener("submit",P);i.loadMoreBtn.addEventListener("click",u);const L={rootMargin:"50px",root:null,threshold:.3};new IntersectionObserver(u,L);async function P(o){if(o.preventDefault(),i.galleryContainer.innerHTML="",l.query=o.currentTarget.elements.searchQuery.value.trim(),l.resetPage(),l.query===""){d.warning({message:"Please, fill the main field"});return}c=0;let e=await h();p(e)}function u(){l.incrementPage(),h()}async function h(){i.loadMoreBtn.classList.add("is-hidden");const o=await l.fetchGallery(),{hits:e,total:s}=o;return c+=e.length,e.length?(p(e),c+=e.length,c<s&&(d.success({message:`Hooray! Found ${s} images!`,position:"topRight"}),i.loadMoreBtn.classList.remove("is-hidden")),c>=s&&d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),e):(d.error({message:"Sorry, no images found.",position:"topRight"}),i.loadMoreBtn.classList.add("is-hidden"),[])}function p(o){const e=o.map(({webformatURL:s,largeImageURL:n,tags:t,likes:r,views:a,comments:f,downloads:m})=>`<div class="photo-card">
    <a href="${n}">
      <img class="photo-img" src="${s}" alt="${t}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${r}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${a}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${f}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${m}
      </p>
    </div>
    </div>`).join("");i.galleryContainer.insertAdjacentHTML("beforeend",e),v.refresh()}
//# sourceMappingURL=index.js.map
