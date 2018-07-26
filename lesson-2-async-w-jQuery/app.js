/* eslint-env jquery */

(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        Authorization: 'Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67'
      }
    }).done(addImage);

    $.ajax({
      url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=0fd16f9ca25b4e0ea140b5e5aa1aa085`
    }).done(addArticle);
  });

  function addArticle(article) {
    let htmlContent = '';
    const articles = article.response.docs;
    console.log(article)
    if(article.web_url) {
      htmlContent = '<ul>' + articles.map(article =>
        `<li class="article">
           <h2>
             <a href="${article.web_url}">${article.snippet}</a>
          </h2>
        </li>` + '</ul>'
      )
    }
    else{
      htmlContent = "No articles for this topic"
    }
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
  }

  function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.full}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
  }

})();
