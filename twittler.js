//remember last Displayed Tweet
var lastDisplayedTweet;
var visitor = "chrisweilacker";
var userToDisplay ="all";
$(document).ready(function(){
        var $body = $('body');
        var index = streams.home.length - 1;
        lastDisplayedTweet = index;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div class="tweet"><a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a> ' +
                    '<span class="right">' + tweet.created_at.toLocaleString() + '</span><br/>'
                    + tweet.message + '</div>');
          $tweet.appendTo($body);
          index -= 1;
        }
        setInterval(function() {displayTweets();}, 3000);
        streams.users[visitor] =[];
        $('#tweet').click(function() {addYourTweet();});
        $(".userTimeline").click(function () {
        displayUserTimeline($(this).attr("href").substring(1));
        });
      });

function displayTweets() {
        var $form = $('form');
        var index = streams.home.length - 1;
        while(index > lastDisplayedTweet){
          var tweet = streams.home[index];
          if (userToDisplay === "all" || userToDisplay === tweet.user) {
          var $tweet = $('<div class="tweet"><a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a> ' +
                    '<span class="right">' + tweet.created_at.toLocaleString() + '</span><br/>'
                    + tweet.message + '</div>');
          $form.after($tweet);
        }
          index -= 1;
        }
        lastDisplayedTweet = streams.home.length - 1;
        $(".userTimeline").click(function () {
        displayUserTimeline($(this).attr("href").substring(1));
        });
}

function addYourTweet() {
  writeTweet($('#msg').val().toString());
  displayTweets();
}

function displayUserTimeline(user) {
  if (userToDisplay === user) {
    return;
  } else {
    userToDisplay = user;
    var $form = $('#PostForm')
    var tweetList = $form.nextAll()
    tweetList.remove();
    var $body = $('body');
    var index = streams.home.length - 1;
    lastDisplayedTweet = index;
    while(index >= 0){
    var tweet = streams.home[index];
    if (userToDisplay === "all" || userToDisplay === tweet.user) {
    var $tweet = $('<div class="tweet"><a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a> ' +
               '<span class="right">' + tweet.created_at.toLocaleString() + '</span><br/>'
                + tweet.message + '</div>');
    }
    $form.after($tweet);
    index -= 1;
    }
    $(".userTimeline").click(function () {
    displayUserTimeline($(this).attr("href").substring(1));
    });
  }
}