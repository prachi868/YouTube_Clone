import navbar from "./navbar.js";
document.querySelector("#navbar").innerHTML = navbar;




// document.getElementById("submit").addEventListener("click", function () {
//   let title = document.querySelector(".inputBox").value;
//   youtubeAP(title);
// });

// async function youtubeAP(title) {
//   try {
//     let data = await fetch(
//       `https://youtube.googleapis.com/youtube/v3/search?&q=${title}&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`
//     );
//     data = await data.json();
//     document.querySelector(
//       ".video_player"
//     ).src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
//     console.log(data.items[0]);
//   } catch (err) {
//     console.log(err + " SHUPAISHTA SUPAISHTA FAILED");
//   }
// }

//appending data on the main page

//getting the data for the main page

async function youtubeTrendingFetcher() {
  let data = await fetch(
    "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=25&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g"
  );
  data = await data.json();
  // console.log(data)
  displayThumbnails(data.items);
  // console.log(data)
}

youtubeTrendingFetcher();

//Map cards on main page --> Trending

function displayThumbnails(data) {
  document.querySelector("#main-videos-container").innerHTML = "";
  data.forEach(async (elem) => {

    

    let col = document.createElement('div');
    col.setAttribute("class", "col-md-3 col-sm-6  ");

    let thumb = document.createElement("img");
    thumb.setAttribute("class", "card-img-top");
    let img_url = `https://i.ytimg.com/vi_webp/${elem.id}/mqdefault.webp`;
    thumb.src = img_url;

    //fetching other data
    let videoDetails = await videoDetailsFetcher(elem.id);

    //Video title

    let title = document.createElement("p");
    title.setAttribute("class", "card-title overflow-hidden");
    title.textContent = videoDetails.items[0].snippet.title;

    //channel name, views and time
    let otherData = document.createElement("div");
    let channelName = document.createElement("p");
    let views = document.createElement("p");

    channelName.textContent = videoDetails.items[0].snippet.channelTitle
    views.textContent = numFormatter(videoDetails.items[0].statistics.viewCount) + " views";

    otherData.setAttribute("class", "card-text ");
    otherData.append(channelName, views);

    //Card Creation
    let card = document.createElement('div');
    card.setAttribute("class", "card mx-0 px-0");

    card.addEventListener('click', function() {
      localStorage.setItem(`videoToPlay`, elem.id);
      window.location.href = "playVideo.html";
    })

    card.addEventListener('mouseover', function(event) {
      event.target.style.cursor = "pointer";
    })

    let channelThumbnail = document.createElement("img");
    channelThumbnail.setAttribute('class', 'channel_thumb')
    let channelId = videoDetails.items[0].snippet.channelId;

    let channelThumbnailData = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`);

    channelThumbnailData = await channelThumbnailData.json();

    channelThumbnail.src = channelThumbnailData.items[0].snippet.thumbnails.default.url;





    // //card body
    let containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'd-flex')
    

    
    

    let cardBody = document.createElement('div');
    cardBody.setAttribute("class", "card-body w-75  justify-content-center");

    //appending data
    cardBody.append(title, otherData);
    containerDiv.append(channelThumbnail, cardBody);
    card.append(thumb, containerDiv);

    

    col.append(card)

    document.querySelector("#main-videos-container").append(col)
  });
}


//VIDEO SEARCH RESULTS FETCHER
function displaySearchResults(data) {
  document.querySelector("#main-videos-container").innerHTML = "";
  data.forEach(async (elem) => {

    let col = document.createElement('div');
    col.setAttribute("class", "col-md-3 col-sm-6");

    let thumb = document.createElement("img");
    thumb.setAttribute("class", "card-img-top");
    let img_url = `https://i.ytimg.com/vi_webp/${elem.id.videoId}/mqdefault.webp`;
    thumb.src = img_url;

    //fetching other data
    let videoDetails = await videoDetailsFetcher(elem.id.videoId);

    //Video title
    let title = document.createElement("p");
    title.setAttribute("class", "card-title overflor-hidden");
    title.textContent = videoDetails.items[0].snippet.title;

    //channel name, views and time
    let otherData = document.createElement("div");
    let channelName = document.createElement("p");
    let views = document.createElement("p");

    channelName.textContent = videoDetails.items[0].snippet.channelTitle
    views.textContent = numFormatter(videoDetails.items[0].statistics.viewCount) + " views";

    otherData.setAttribute("class", "card-text ");
    otherData.append(channelName, views);

    //Card Creation
    let card = document.createElement('div');
    card.setAttribute("class", "card mx-0 px-0");

    card.addEventListener('click', function() {
      localStorage.setItem(`videoToPlay`, elem.id);
      window.location.href = "playVideo.html";
    })


    //card body
    let cardBody = document.createElement('div');
    cardBody.setAttribute("class", "card-body");

    //appending data
    cardBody.append(title, otherData);
    card.append(thumb, cardBody);

    col.append(card)

    document.querySelector("#main-videos-container").append(col)
  });
}


//Fetching video details
async function videoDetailsFetcher(id) {
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`
  );

  data = await data.json();

  // console.log(data)
  return data;
}

//num to K convertor
function numFormatter(num) {
  num = Number(num);
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}




//Giving functionality to search and submit buttons on the navbar

document.querySelector("#submit").addEventListener('click', function(event) {
  event.preventDefault()
  let searched = document.querySelector("#search").value;
  searchResults(searched);
  document.querySelector(`.debouncer`).classList.add('hidden');
})

//Fetch searched movies to display 
async function searchResults(query) {
  let data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?&q=${query}&maxResults=25&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`);
  data = await data.json();
  displaySearchResults(data.items);
}

//Return search Array for debouncing
async function searchResultsForDebouncer(query) {
  let data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?&q=${query}&maxResults=10&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`);
  data = await data.json();
  return data.items;
}

// EXPORTING
export default function sideBar() {
  return `<button class="btn"><i class="bi bi-house-door-fill"></i>
    <p>Home</p></button>

    <button class="btn"><i class="bi bi-compass"></i>
      <p>Explore</p></button>

      <button class="btn"><i class="bi bi-collection-play"></i>
        <p>Subscriptions</p></button>

         <button class="btn"><i class="bi bi-play-btn"></i>
    <p>Library</p></button>`
}



//Debouncing
  document.querySelector(`#search`).addEventListener('input', async function() {
    let searched = document.querySelector("#search").value;
    debouncer(searched)
  })

  let x;
  async function debouncer(input) {
    if(input == "") {
      document.querySelector(`.debouncer`).classList.add('hidden');
    }

    document.querySelector(".debouncer").innerHTML = "";
    clearInterval(x);
    x = await setTimeout(async function() {
      document.querySelector(`.debouncer`).classList.remove('hidden');
      
      let boxx = document.querySelector(".debouncer");
      let data = await searchResultsForDebouncer(input);
      data.forEach(async function(elem) {
        let div = document.createElement("div");
        let videoDetails = await videoDetailsFetcher(elem.id.videoId);
        div.textContent = videoDetails.items[0].snippet.title;

        div.addEventListener('click', function() {
          // console.log(elem.id.videoId)
          localStorage.setItem(`videoToPlay`, elem.id.videoId);
          window.location.href = "playVideo.html";
        })

        boxx.append(div);

       
      })
    }, 300)
  }
