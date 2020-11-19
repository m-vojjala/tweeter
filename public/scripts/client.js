/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const createTweetElement = SingleTweet => {
    //  console.log(SingleTweet)
    const $tweet =
      $(`<article class="tweet">
    <header>
    <img src="${SingleTweet.user.avatars}" />
      <span>
         ${SingleTweet.user.name}
      </span>
    </header>
    <p>${SingleTweet.content.text}</p>
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
     console.log(All)
    for (let tweet of All) {
      //  console.log(`tweet ${tweet}`);
      const $newTweet = createTweetElement(tweet);
      console.log(`newtweet:${$newTweet}`)
      $("#tweets-container").append($newTweet);
    }
  }
  // renderTweets(data);
  const checkValidation = (tweet)=>{
    
    }
  
$('form').on("submit",event=>{
event.preventDefault();
const tweet = $('form textarea').val();
if(tweet === "" || tweet === null){
  return alert("Your tweet is empty");
}else if(tweet.length > 140){
   return alert("Your tweet exceeds the maximum characters!");
}else{
$
 .ajax({
   url:"/tweets",
   method:"POST",
   data:$('form').serialize()
 }).then(data => console.log(data));
}
});

const loadTweets = () =>{
  $
   .ajax("/tweets",{method: 'GET',dataType: "json"})
   .then(function(res){
    //  console.log(res);
      renderTweets(res)});
}
loadTweets();
});

