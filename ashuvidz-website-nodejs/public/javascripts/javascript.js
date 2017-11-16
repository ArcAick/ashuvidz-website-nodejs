// Generation des listes vidéo pour Page vidéo

// Page updater
function videoPageUpdater(pageToken) {
  $.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUBofSSDlt4EZki2VQ9PWnyw&part=snippet&key=AIzaSyAy0qWFBAcoQfjjykI8O0njmofEF5nvoJY&maxResults=9&pageToken=" + pageToken, function(playlist) {
    resultsPerPage = playlist.pageInfo.resultsPerPage;
    totalResults = playlist.pageInfo.totalResults;

    for (var i = 0; i < resultsPerPage; i++) {
      videoUrl[i] = playlist.items[i].snippet.resourceId.videoId;
    };

    for (var i = 0; i < resultsPerPage; i++) {
      thumbnail = playlist.items[i].snippet.thumbnails.maxres.url;
      videoId = playlist.items[i].snippet.resourceId.videoId;
      videoTitle = playlist.items[i].snippet.title;

      $("div[videoid='" + i + "'] > a > img ").attr("src", thumbnail);
      $("div[videoid='" + i + "'] > a > div > p ").text(videoTitle);
      $("div[videoid='" + i + "']").attr("videourl", videoUrl[i]);
    };

    prevToken = playlist.prevPageToken;
    nextToken = playlist.nextPageToken;

    pagerGenerator();
  })
};

// Popup updater
function videoPopup(selector){
  $(".embed-responsive-item").attr("src", "https://www.youtube.com/embed/" + selector);
};

// Gère la fermeture de la popup vidéo.
function closingVideoPopup() {
  $(".embed-responsive-item").attr("src", "");
}


// generateur des boutons
function pagerGenerator() {
  $(".pager").empty();

  if (prevToken) {
    $(".pager").append("<button type='button' class='btn btn-primary btn-lg' id='prev'>Précédent</button>")
    $("#prev").click(function() {
      videoPageUpdater(prevToken);
    });
  } else {}

  if (nextToken) {
    $(".pager").append("<button type='button' class='btn btn-primary btn-lg' id='next'>Suivant</button>");
    $("#next").click(function() {
      videoPageUpdater(nextToken);
    });
  } else {}
};

// Generateur de page
function videoPageGenerator(pageToken) {
  $.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUBofSSDlt4EZki2VQ9PWnyw&part=snippet&key=AIzaSyAy0qWFBAcoQfjjykI8O0njmofEF5nvoJY&maxResults=9&page", function(playlist) {
    resultsPerPage = playlist.pageInfo.resultsPerPage;
    totalResults = playlist.pageInfo.totalResults;

    for (var i = 0; i < resultsPerPage; i++) {
      videoUrl[i] = playlist.items[i].snippet.resourceId.videoId;
    };

    var j = 0;
    for (var i = 0; i < resultsPerPage; i++) {
      thumbnail = playlist.items[i].snippet.thumbnails.maxres.url;
      videoTitle = playlist.items[i].snippet.title;

      if (i % 3 === 0) {
        j++;
        $("#videos").append("<div class='row' id='videosraw" + j + "'>\
        </div>")
      } else {}

      $("#videosraw" + j).append("<div class='col-xs-12 col-md-4 animated fadeIn' videoId='" + i + "' videoUrl='" + videoUrl[i] + "' data-toggle='modal' data-target='#myModal'>\
        <a href='javascript:void(0)' class='thumbnail'>\
          <img src=" + thumbnail + " class='img-responsive' alt='coucou'>\
          <div class='caption text-center'>\
            <p>" + videoTitle + "</p>\
          </div>\
        </a>\
      </div>");
      $("div[videoUrl='" + videoUrl[i] + "']").click(function(){
        videoPopup($(this).attr("videourl"));
      });
    };

    prevToken = playlist.prevPageToken;
    nextToken = playlist.nextPageToken;

    $("#videos").append("<div class='row pager'>\
    </div>")
    $("#myModal").on("hidden.bs.modal", function () {
      closingVideoPopup();
    });
    pagerGenerator();
})};

var prevToken;
var nextToken;
var resultsPerPage;
var totalResults;
var thumbnail;
var videoId = [];
var videoUrl = [];
var videoTitle;