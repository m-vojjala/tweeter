/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#error-message").hide();

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
      <div class="handle">${SingleTweet.user.handle}</div>
    </header>
    <p>${escape(SingleTweet.content.text)}</p>
    <footer>
    <span><strong>${SingleTweet.created_at}</strong></span>
    <div>
      <i class="fas blue fa-flag"></i>
      <i class="fas blue fa-sync"></i>
      <i class="fas blue fa-heart"></i>
    </div>
    </div>
  </footer>
  </article>`)

    return $tweet;
  }
 

  const renderTweets = (allTweets) => {
    //  console.log(All)
    for (let tweet of allTweets) {
      //  console.log(`tweet ${tweet}`);
      const $newTweet = createTweetElement(tweet);
      // console.log(`newtweet:${$newTweet}`)
      $("#tweets-container").prepend($newTweet);
    }
  }
  

 $('.tweet-button').on('click',event=>{
   $(".compose-tweet").toggle("slow");
 });


$('form').on("submit",event=>{
event.preventDefault();
const tweet = $('#tweet-text').val();
if(tweet === "" || tweet === null){
  $("#error-message").text("Invalid Tweet!!")
 $("#error-message").slideDown("slow")
 setTimeout(function(){
  $("#error-message").slideUp("slow");
}, 3000)
}else if(tweet.length > 140){
  $("#error-message").text("Tweet must not exceed 140 characters!!")
  $("#error-message").slideDown("slow")
  setTimeout(function(){
    $("#error-message").slideUp("slow");
  }, 3000)
}else{
$
 .ajax({
   url:"/tweets",
   method:"POST",
   data:$('form').serialize()
 }).then(()=>{
  $("#tweets-container").empty();
  $("#error-message").hide("slow");
loadTweets();
 });
}
});

const loadTweets = () =>{
  $
   .ajax("/tweets",{method: 'GET',dataType: "json"})
   .then(function(res){
    //  console.log(res);
      renderTweets(res)
    });
}
loadTweets();
});





 