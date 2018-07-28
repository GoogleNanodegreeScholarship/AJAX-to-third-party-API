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
      .then(addImage)
      .catch(e => requestError(e, 'image'));

    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=0fd16f9ca25b4e0ea140b5e5aa1aa085` ,{
    }).then(response => response.json())
      .then(addArticle)
      .catch(e => requestError(e, 'article'));


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

    function addArticle(data) {
      console.log(data.response.docs)
      let htmlContent = '';
      const articles = data.response.docs;

      if(articles) {
        htmlContent ='<ul>' + articles.map(article =>
          `<li class="article">
             <h2>
               <a href="${article.web_url}">${article.snippet}</a>
             </h2>
           </li>` + '</ul>'
        )}
      else {
        htmlContent = 'Unfortunately no articles match your request'
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function requestError(e, part) {
      console.log(e);
      responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
  });
})();
