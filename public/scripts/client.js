/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    let input = event.target.text.value;
    let $errorElement = $('#error');
    
    // Clear any previous error messages
    $errorElement.slideUp();
    $errorElement.empty();

    if (input === null || input === "") {
      $('#message').text("Tweet cannot be empty");
      $errorElement.text("Error: Tweet cannot be empty.").slideDown();
    }

    if (input.length > 140) {
      $('#message').text("Too long! Please follow 140 character limit");
      $errorElement.text("Error: Too long! Please follow 140 character limit.").slideDown();
    }

    if (input !== null && input !== "" && input.length <= 140) {
      let serializedData = $(this).serialize();
      console.log(serializedData);

      const $form = $(this);

      $.post('/tweets', serializedData)
        .done(function () {
          $form.find('textarea[name="text"]').val('');
          $form.find('output[name="counter"').val(140);
          updateTweets();
      });
    }
  });
});

const setTime = (time) => {
  const currentTime = new Date().getTime();
  const tweetTime = new Date(time);
  const difference = currentTime - tweetTime;

  // time units
  const min = 60 * 1000;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  if (difference < min) {
    return "Just now";
  } else if (difference < hour) {
    let minsAgo = Math.floor(difference / min);
    return (`${minsAgo} ${minsAgo === 1 ? 'minute' : 'minutes'} ago`);
  } else if (difference < day) {
    let hoursAgo = Math.floor(difference / hour);
    return (`${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`);
  } else if (difference < week) {
    let daysAgo = Math.floor(difference / day);
    return (`${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`);
  } else if (difference < month) {
    let weeksAgo = Math.floor(difference / week);
    return (`${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`);
  } else if (difference < year) {
    let monthsAgo = Math.floor(difference / month);
    return (`${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`);
  } else {
    let yearsAgo = Math.floor(difference / year);
    return (`${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`);
  }
};

const updateTweets = () => {
  $.get('/tweets', (data) => {
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
      $("#tweets").append(createTweetElement(tweets[tweet]));
    }
  });
}

const createTweetElement = (tweet) => {
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

  $header.append($profilePic, $name, $handle);
  $text.append($tweetContent);
  $icons.append($flag, $retweet, $heart);
  $footer.append($time, $icons);

  $tweet.append($header, $text, $footer);
    
  return $tweet;
};

loadTweets();