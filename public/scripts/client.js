/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function () {
  $('#tweet-form').on('submit', function(event) {
    // ensure page does not submit
    event.preventDefault();

    let input = event.target.text.value;
    let $errorElement = $('#error');
    
    // Clear any previous error messages
    $errorElement.slideUp();
    $errorElement.empty();

    // load error if text field is empty
    if (input === null || input === "") {
      $('#message').text("Tweet cannot be empty");
      $errorElement.text("Error: Tweet cannot be empty.").slideDown();
    }

    // load error if there are two many characters
    if (input.length > 140) {
      $('#message').text("Too long! Please follow 140 character limit");
      $errorElement.text("Error: Too long! Please follow 140 character limit.").slideDown();
    }

    // success case
    if (input !== null && input !== "" && input.length <= 140) {
      let serializedData = $(this).serialize();
      console.log(serializedData);

      const $form = $(this);

      $.post('/tweets', serializedData)
        .done(function () {
          $form.find('textarea[name="text"]').val('');
          $form.find('output[name="counter"]').val(140);
          updateTweets();
      });
    }
  });
});

const setTime = (time) => {
    const timeAgoText = timeago.format(new Date(time));
    return timeAgoText;
};

const updateTweets = () => {
  $.get('/tweets', (data) => {
    // retrieve the latest tweet
    const latestTweet = data[data.length - 1];
    $('#tweets').prepend(createTweetElement(latestTweet));
  });
};

const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};

const renderTweets = (tweets) => {
  $(document).ready(function() {
    for (const tweet in tweets) {
      $("#tweets").prepend(createTweetElement(tweets[tweet]));
    }
  });
}

const createTweetElement = (tweet) => {
  // create all elements
  const $tweet = $("<article>");

  const $header = $("<header>");
  const $profilePic = $("<img>").attr('src', tweet.user.avatars);
  const $name = $("<p>").text(tweet.user.name);
  const $handle = $("<p>").text(tweet.user.handle).addClass('handle');

  const $text = $("<div>");
  const $tweetContent = $("<p>").text(tweet.content.text).addClass('tweet-content');

  const $footer = $("<footer>");
  const $icons = $("<p>").addClass('icons');

  const $time = $("<p>").text(setTime(tweet.created_at));


  const $flag = $("<i class='fa-solid fa-flag'></i>");
  const $retweet = $("<i class='fa-solid fa-retweet'></i>");
  const $heart = $("<i class='fa-solid fa-heart'></i>");

  // hover events
  $tweet.hover(
    (event) => {
      $(event.currentTarget).css("box-shadow", "5px 5px #CBC3E3");
    },
    (event) => {
      $(event.currentTarget).css("box-shadow", "");
    }
  );
  $flag.hover(
    (event) => {
    $(event.currentTarget).css("color", '#FFBF00');
    },
    (event) => {
      $(event.currentTarget).css("color", '#4056A1');
    }
  );
  $retweet.hover(
    (event) => {
    $(event.currentTarget).css("color", '#FFBF00');
    },
    (event) => {
      $(event.currentTarget).css("color", '#4056A1');
    }
  );
  $heart.hover(
    (event) => {
    $(event.currentTarget).css("color", '#FFBF00');
    },
    (event) => {
      $(event.currentTarget).css("color", '#4056A1');
    }
  );

  // append all contents for header and footer
  $header.append($profilePic, $name, $handle);
  $text.append($tweetContent);
  $icons.append($flag, $retweet, $heart);
  $footer.append($time, $icons);

  // append all items to the article
  $tweet.append($header, $text, $footer);
    
  return $tweet;
};

loadTweets();