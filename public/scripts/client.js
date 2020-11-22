/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  $("#error-message").hide();
 
  // Creating structure of tweets dynamically
  const createTweetElement = SingleTweet => {
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
  const dateCreated = new Date(SingleTweet.created_at);
  const todayDate = new Date();
  const differenceTime = Math.abs(dateCreated.getTime()- todayDate.getTime());
  const days = Math.floor(differenceTime/(1000*3600*24));
  
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
    <span><strong>${days} days ago</strong></span>
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

  // Takes the array of tweets and looped through all the tweets and added to the section(tweets-container)
  const renderTweets = (allTweets) => {
    for (let tweet of allTweets) {
      const $newTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($newTweet);
    }
    $("#tweet-text").val('');
    $(".counter").val(140);
  }
 
  // function to make "write a tweet" button work when clicked
  $('.tweet-button').on('click', event => {
    event.preventDefault();
    $(".compose-tweet").toggle("slow");
  });

  // on submit of form validation is done to check the input is valid or not 
  // posts the tweets to the server using AJAX
  $('form').on("submit", event => {
    event.preventDefault();
    const tweet = $('#tweet-text').val();
    if (tweet === "" || tweet === null) {
      $("#error-message").text("Invalid Tweet!!")
      $("#error-message").slideDown("slow");
      setTimeout(function () {
        $("#error-message").slideUp("slow");
      }, 3000);
    } else if (tweet.length > 140) {
      $("#error-message").text("Tweet must not exceed 140 characters!!")
      $("#error-message").slideDown("slow");
      setTimeout(function () {
        $("#error-message").slideUp("slow");
      }, 3000);
    } else {
      $
        .ajax({
          url: "/tweets",
          method: "POST",
          data: $('form').serialize()
        }).then(() => {
          $("#tweets-container").empty();
          $("#error-message").hide("slow");
          loadTweets();
        });
    }
  });

  // Fetched the tweets using AJAX
  const loadTweets = () => {
    $
      .ajax("/tweets", { method: 'GET', dataType: "json" })
      .then(function (res) {
        //  console.log(res);
        renderTweets(res);
      });
  }
  loadTweets();
});





