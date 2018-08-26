//remember last Displayed Tweet index, set which user to Display as all, and set the username for tweeting as my name
var lastDisplayedTweet;
var visitor = "chrisweilacker";
var userToDisplay ="all";

//initial creation of document
$(document).ready(function(){
        var $body = $('body');
        var index = streams.home.length - 1;
        lastDisplayedTweet = index;
        //loop through the initial tweets and add the appropriate divs
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div class="tweet"><blockquote class="tweet">' + tweet.message + 
                    '</br><span><strong>-<a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a><strong> ' + moment(tweet.created_at).fromNow() + '</span><br/>'
                    + '</div>');
          $tweet.appendTo($body);
          index -= 1;
        }
        //redisplay new tweets every 3 seconds
        setInterval(function() {displayTweets();}, 3000);
        //create a blank array for my tweets
        streams.users[visitor] =[];
        //post tweet by setting event handler for the #tweet button on click
        $('#tweet').click(function() {addYourTweet();});

        //if you click a username link or the display all users link shows only those users
        $(".userTimeline").click(function () {
        displayUserTimeline($(this).attr("href").substring(1));
        });
      });

function displayTweets() {
    //get the form element and the sibling elements
    var $form = $('#PostForm')
    var tweetList = $form.nextAll()
    //remove all the sibling elements and rebuild the tweet list.
    tweetList.remove();
    var $body = $('body');
    //loop through all the tweets and repost only those that match the user we want to see
    var index = streams.home.length - 1;
    lastDisplayedTweet = index;
    while(index >= 0){
    var tweet = streams.home[index];
    if (userToDisplay === "all" || userToDisplay === tweet.user) {
      var $tweet = $('<div class="tweet"><blockquote class="tweet">' + tweet.message + 
      '</br><span><strong>-<a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a><strong> ' + moment(tweet.created_at).fromNow() + '</span><br/>'
      + '</div>');
    }
    $tweet.appendTo($body);
    index -= 1;
    }
    $(".userTimeline").click(function () {
      displayUserTimeline($(this).attr("href").substring(1));
    });
}

function addYourTweet() {
  //take the message in the msg input box and add the tweet.
  writeTweet($('#msg').val().toString());
  displayTweets();
  //reset the message box to empty
  $('#msg').val('');
}

function displayUserTimeline(user) {
  //check if the same user was clicked if so dont do anything
  if (userToDisplay === user) {
    return;
  } else {
    //set the new User to Display
    userToDisplay = user;
    //get the form element and the sibling elements
    var $form = $('#PostForm')
    var tweetList = $form.nextAll()
    //remove all the sibling elements and rebuild the tweet list.
    tweetList.remove();
    var $body = $('body');
    //loop through all the tweets and repost only those that match the user we want to see
    var index = streams.home.length - 1;
    lastDisplayedTweet = index;
    while(index >= 0){
    var tweet = streams.home[index];
    if (userToDisplay === "all" || userToDisplay === tweet.user) {
      var $tweet = $('<div class="tweet"><blockquote class="tweet">' + tweet.message + 
      '</br><span><strong>-<a href="#' + tweet.user + '" class="userTimeline">@' + tweet.user + '</a><strong> ' + moment(tweet.created_at).fromNow() + '</span><br/>'
      + '</div>');
    }
    $tweet.appendTo($body);
    index -= 1;
    }
    //reapplying the click function even to all new tweets.
    $(".userTimeline").click(function () {
    displayUserTimeline($(this).attr("href").substring(1));
    });
  }
}