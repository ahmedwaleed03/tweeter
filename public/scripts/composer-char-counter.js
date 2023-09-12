$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    let inputLength = $(this).val().length;
    let charsLeft = 140 - inputLength;

    // find counter element
    let parent = $(this).parents();
    let form = parent[0];
    let counterElm = form.counter;

    $(counterElm).text(charsLeft);

    if (charsLeft < 0) {
      $(counterElm).css("color", '#FF0000');
    } else {
      $(counterElm).css("color", '#2d2d2d');
    }
  });
});