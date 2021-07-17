// CryptoCompare news api
const newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";

// Pass response data to new function
const fetchUrl = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  if ((response.status !== 200) | !response.ok) {
    throw new Error();
  }
  console.log("Response: " + response.status);
  prepare(data);
};

// Fetch url and catch errors
fetchUrl(newsUrl).catch((err) => console.log("Error!", err.message));

// Prepare data
const prepare = (data) => {
  for (let keys of Object.keys(data.Data)) {
    let key = data.Data[keys];
    let c = [
      key.id,
      key.imageurl,
      key.source_info.name,
      key.title,
      new Date(key.published_on * 1000).toLocaleDateString("en-US"),
      key.body,
      key.url,
      key.tags,
      key.categories,
    ];
    fillPage(c);
  }
};

// Create page content
const fillPage = (c) => {
  const app = document.querySelector("#app");
  let div = document.createElement("div");
  div.innerHTML = `<div id="content">
                    <h3>${c[3]}</h3>
                    <figure>
                        <img src="${c[1]}" alt="${c[2]}, ${c[7]}"></img>
                        <figcaption><b>${c[2]}</b></figcaption>
                    </figure>
                    <h4>${c[5]} <a href="${c[6]}" target="_blank" rel="noopener">more...</a></h4>
                    <p id="date"><i>${c[4]}</i></p>
                    <p>${c[8]}</p>
                  </div>`;
  app.append(div);
};
