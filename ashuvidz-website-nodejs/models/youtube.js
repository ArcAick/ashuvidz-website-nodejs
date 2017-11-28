var request = require('request-promise');

module.exports = {
    videoPageGenerator: function (){
        return request('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUBofSSDlt4EZki2VQ9PWnyw&part=snippet&key=AIzaSyAy0qWFBAcoQfjjykI8O0njmofEF5nvoJY&maxResults=9');
}};