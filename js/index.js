function updateQuote(q,a,xhr) {
  console.log("Updating quote...");
  document.getElementById("quote").innerHTML = q;
  console.log("Updating author...");
  document.getElementById("author").innerHTML = "- " + a;
  
  $('.button').attr("disabled",false);
  $('.quote').removeClass('fadeaway');
  $('.author').removeClass('fadeaway');
}

function getQuote() {
  var url = 'https://cors.now.sh/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?' + (new Date()).getTime();
  console.log(url);
  
  var quoteRequest = new XMLHttpRequest();
  quoteRequest.onreadystatechange = function() {
    if (quoteRequest.readyState === 4 && quoteRequest.status === 200) {
      console.log("Getting new quote...");

      var quoteInfo = JSON.parse(quoteRequest.responseText);
      var quote = quoteInfo[0].content;
      var author = quoteInfo[0].title;

      console.log("New quote: " + quote);

      updateQuote(quote,author);
    }
  }
  
  quoteRequest.open("GET", url, true);
  quoteRequest.send();
}

function newQuote() {
  getQuote();
  console.log("New quote requested.");
  $('.button').attr("disabled",true);
  $('.quote').addClass('fadeaway');
  $('.author').addClass('fadeaway');
}

function sendTweet() {
    var quote = document.getElementById("quote").innerText;
  var author = document.getElementById("author").innerText;
  var tweetUrl = 'https://twitter.com/share?text=' + "\"" + encodeURIComponent(quote) + "\"" + 
    ' ' + encodeURIComponent(author);
    
  window.open(tweetUrl);
}

$(document).ready(function(){
  newQuote();
});