/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // $('form textarea')
  const createTweetElement = SingleTweet => {
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
     console.log(SingleTweet)
    // const safeHTML = `<p>${escape(SingleTweet.content.text)}</p>`;
    const $tweet =
      $(`<article class="tweet">
    <header>
    <img src="${SingleTweet.user.avatars}" />
      <span>
         ${SingleTweet.user.name}
      </span>
    </header>
    <p>${escape(SingleTweet.content.text)}</p>
    <footer>
    <span><strong>${SingleTweet.created_at}</strong></span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-sync"></i>
      <i class="fas fa-heart"></i>
    </div>
    </div>
  </footer>
  </article>`)

    return $tweet;
  }
  //  const $newTweet = createTweetElement(tweetData);
  //  $("#tweet-container").append($newTweet);

  const renderTweets = (All) => {
    //  console.log(All)
    for (let tweet of All) {
      //  console.log(`tweet ${tweet}`);
      const $newTweet = createTweetElement(tweet);
      // console.log(`newtweet:${$newTweet}`)
      $("#tweets-container").prepend($newTweet);
    }
  }
  // renderTweets(data);
 
$('form').on("submit",event=>{
event.preventDefault();
const tweet = $('form textarea').val();
if(tweet === "" || tweet === null){
  return alert("Your tweet is empty");
} 
if(tweet.length > 140){
   return alert("Your tweet exceeds the maximum characters!");
}
$
 .ajax({
   url:"/tweets",
   method:"POST",
   data:$('form').serialize()
 }).then(()=>{
  $("#tweets-container").empty();
loadTweets();
 });
});

const loadTweets = () =>{
  $
   .ajax("/tweets",{method: 'GET',dataType: "json"})
   .then(function(res){
    //  console.log(res);
      renderTweets(res)});
}

// const addLatestTweet = (tweets)=>{
//   const latestTweet = Object.values(tweets).pop();
//   createTweetElement(latestTweet);
// }

});

