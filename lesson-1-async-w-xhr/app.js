(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67');
    unsplashRequest.send();

    function addImage() {
      let htmlContent = '';
      let data = JSON.parse(this.responseText);
      console.log(data)
      if (data && data.results && data.results[0]) {
        let firstImage = data.results[0];
        htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
          </figure>`;
      } else {
        htmlContent = '<div class="error-no-image">No images available</div>';
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
  });
})
();
