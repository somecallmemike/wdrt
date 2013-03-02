function Play(){
    document.getElementById("player").innerHTML='playing<audio autoplay><source src="http://audio.wdrt.org:8000/high" ' +
        'type="audio/ogg; codecs=vorbis"><source src="http://audio.wdrt.org:8000/high" ></audio>';
}

function Stop(){
    document.getElementById("player").innerHTML="stopped";

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
            var string = title + " " + randomnumber;
            document.getElementById("meta-data").innerHTML=title;
        },
        error: function() {
            document.getElementById("meta-data").innerHTML="Unable to retrieve info!";
        }
    });
}

var first = getTitle();
var loop = setInterval( function() {getTitle()}, 30000);