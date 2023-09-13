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

const createTweet = (tweet) => {
  const $article = $("<article>");

  const $header = $("<header>");
  const $profilePic = $("<img>").attr('src', tweet.user.avatars);
  const $name = $("<p>").text(tweet.user.name);
  const $handle = $("<p>").text(tweet.user.handle).addClass('handle');

  const $text = $("<div>");
  const $tweet = $("<p>").text(tweet.content.text);

  const $footer = $("<footer>");
  const $icons = $("<p>").addClass('icons');
  const $time = $("<p>").text(setTime(tweet.created_at));
  const $flag = $("<i class='fa-solid fa-flag'></i>");
  const $retweet = $("<i class='fa-solid fa-retweet'></i>");
  const $heart = $("<i class='fa-solid fa-heart'></i>");

  // hover events
  $article.hover(
    (event) => {
      $(event.currentTarget).css("box-shadow", "5px 5px #CBC3E3");
    },
    (event) => {
      $(event.currentTarget).css("box-shadow", ""); t
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
  $text.append($tweet);
  $icons.append($flag, $retweet, $heart);
  $footer.append($time, $icons);

  $article.append($header, $text, $footer);

  $("#tweets").append($article);
};


// hardcode tweets
let tweets = {
  1: {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1694382064373
  },
  2: {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1694468464373
  }
};


for (const tweet in tweets) {
  createTweet(tweets[tweet]);
}