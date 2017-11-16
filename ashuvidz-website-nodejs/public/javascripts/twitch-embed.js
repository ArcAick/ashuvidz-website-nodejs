
// Youtube object player constructor with parameters
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    playerVars:
          {
            listType:'user_uploads',
            list: 'Ashuvidz'
          }
});
}
// If twitch channel is live show twitch channel embed. If not show Youtube channel last video
$.getJSON("https://api.twitch.tv/kraken/streams/ashuvidz?client_id=yufsibfdh5gwli5nzdj01ceghc1ubv", function(channel) {
  //live is offline Youtube player appened
  if (channel["stream"] == null) {

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;


    //live is online Twitch player
  } else {
      new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 250,
        channel: "ashuvidz",
        theme: "dark"
      });
    }
});
