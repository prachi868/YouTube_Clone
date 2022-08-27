//Importing the navbar 
import navbar from "./navbar.js";
document.querySelector('.navbar_container').innerHTML = navbar;

//fetching from LS the video to play that has been clicked on the main page
let videoToPlay = localStorage.getItem("videoToPlay");
document.querySelector('#video-to-play').src = `https://www.youtube.com/embed/${videoToPlay}`;
videoDetailsFetcherAndDisplay(videoToPlay);


//fetching video title data and other data
async function videoDetailsFetcherAndDisplay(id) {
  let data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g`
  );

  data = await data.json();
  
  //VIDEO TITLE
  document.querySelector("#video_title").textContent = data.items[0].snippet.title;

  //VIDEO Views
  document.querySelector("#views").innerHTML =  data.items[0].statistics.viewCount + " views";

  //VIDEO likes
  document.querySelector("#likes").innerHTML = `<i class="bi bi-hand-thumbs-up"></i>` +  numFormatter(data.items[0].statistics.likeCount)
}




  //Map cards on main page --> Trending

  youtubeTrendingFetcher();

  async function youtubeTrendingFetcher() {
    let data = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=25&key=AIzaSyACVWHwasNkEaH7_cIjRQK0m9aUPIqmJ1g"
    );
    data = await data.json();
    displayThumbnails(data.items);
    // console.log(data)
  }
  
  function displayThumbnails(data) {
    document.querySelector("#side_videos").innerHTML = "";
    data.forEach(async (elem) => {
  
      let col = document.createElement('div');
      col.setAttribute("class", "col-12 d-flex");
  
      let thumb = document.createElement("img");
      thumb.setAttribute("class", "card-img-top");
      let img_url = `https://i.ytimg.com/vi_webp/${elem.id}/mqdefault.webp`;
      thumb.src = img_url;
  
      //fetching other data
      let videoDetails = await videoDetailsFetcher(elem.id);
  
      //Video title
      let title = document.createElement("p");
      title.setAttribute("class", "card-title h6 overflow-hidden");
      title.textContent = videoDetails.items[0].snippet.title;
  
      //channel name, views and time
      let otherData = document.createElement("div");
      let channelName = document.createElement("p");
      let views = document.createElement("p");
  
      channelName.textContent = videoDetails.items[0].snippet.channelTitle
      views.textContent = numFormatter(videoDetails.items[0].statistics.viewCount) + " views";
  
      otherData.setAttribute("class", "card-text");
      otherData.append(channelName, views);
  
      //Card Creation
      let card = document.createElement('div');
      card.setAttribute("class", "card mx-0 px-0 border-0 mb-2");
  
      //card body
      let cardBody = document.createElement('div');
      cardBody.setAttribute("class", "card-body");
  
      //appending data
      cardBody.append(title, otherData);
      card.append(thumb, cardBody);
  
      col.append(card)
  
      document.querySelector("#side_videos").append(col)
    });
  }
  

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