function Play(){
    document.getElementById("player").innerHTML='playing<audio autoplay><source src="http://audio.wdrt.org:8000/high" ' +
        'type="audio/ogg; codecs=vorbis"><source src="http://audio.wdrt.org:8000/high" ></audio>';
    $('img[name="play"]').attr('src', 'img/stopbutton.png');
}

function Stop(){
    document.getElementById("player").innerHTML="stopped";
    $('img[name="play"]').attr('src', 'img/playbutton.png');
}

$(function() {
    $(".playback").click(function(e) {
        e.preventDefault();

        // This next line will get the audio element
        // that is adjacent to the link that was clicked.
        var status = document.getElementById("status").className;
        if (status == 'stopped') {
            Play();
            document.getElementById("status").setAttribute("class", "playing");
        } else if (status == 'playing') {
            Stop();
            document.getElementById("status").setAttribute("class", "stopped");
        }
    });
});

function getTitle() {
    var randomnumber=Math.floor(Math.random()*110)
    //var URL = "http://audio.wdrt.org:8000/high.xspf"
    var URL = "http://gonze.com/xspfgate/?xspflink=http%3A%2F%2Faudio.wdrt.org%3A8000%2Fhigh.xspf&jsonp=playlist"
    $.ajax({
        type: 'GET',
        url: URL,
        dataType: 'jsonp',
        jsonpCallback: 'playlist',
        success: function( data ){
            var title = data.playlist.track[0].title;
            var track = title.match("(.*).by")[1];
            var artist = title.match("by.(.*).from.*$")[1];
            var album = title.match("from.(.*)$")[1];
            var string = title + " " + randomnumber;
            refreshArtwork(artist, track);
            //document.getElementById("meta-data").innerHTML=title;
            document.getElementById("artist").innerHTML="Artist: " + artist;
            document.getElementById("track").innerHTML="Track: " + track;
            document.getElementById("album").innerHTML="Album: " + album;
        },
        error: function() {
            document.getElementById("meta-data").innerHTML="Unable to retrieve info!";
        }
    });
}

function refreshArtwork(artist, track) {
    $.ajax({
        url: 'http://itunes.apple.com/search',
        data: {
            term: artist + ' ' + track,
            media: 'music'
        },
        dataType: 'jsonp',
        success: function(json) {
            if(json.results.length === 0) {
                $('img[name="nowplayingimage"]').attr('src', '');
                return;
            }

            // trust the first result blindly...
            var artworkURL = json.results[0].artworkUrl100;
            $('img[name="nowplayingimage"]').attr('src', artworkURL);
            $('.artist_name').empty().append(json.results[0].artistName);
            $('.song_name').empty().append(json.results[0].trackName);
            $('.album_name').empty().append(json.results[0].collectionName);
        }
    });
}

var first = getTitle();
var loop = setInterval( function() {
    getTitle();
}, 30000);