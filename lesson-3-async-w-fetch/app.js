(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

      fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,{
        headers: {
          Authorization: 'Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67'
        }
      }).then(response => response.json())
      .then(addImage);

      function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];

        if(firstImage) {
        htmlContent = `<figure> <img src="${firstImage.urls.small}" alt="$searchedForText">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
          htmlContent = 'Unfortunately no image match your request'
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
      }
    });
})();
