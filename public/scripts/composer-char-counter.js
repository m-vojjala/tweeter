$(document).ready(function () {

  $("#tweet-text").on("input", function (event) {
    event.preventDefault();
    const lengthOfText = 140 - $(event.target).val().length;
    const counter = $(".counter");
    // document.querySelector('.counter')
    counter.val(lengthOfText);
    counter.val() <= 0 ? counter.css("color", "red") : counter.css("color", "black");
  });
});