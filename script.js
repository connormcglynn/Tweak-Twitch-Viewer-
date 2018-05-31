$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

const channels = ["EASportsFIFA", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "food", "c4mlann", "ninja", "bethesda", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "overwatchleague", "shroud"]

var getData = (data) => { 
var user = data._links.self.substr(37);
console.log(data);
if (data.stream != null) {
    var logo = data.stream.channel.logo;
    var name = data.stream.channel.display_name;
    var game = data.stream.game;
    var status = data.stream.channel.status;
    $('#res').append("<tr class='online'><td><a target='_blank' href='https://www.twitch.tv/" + user + "'><img src='" + logo + "' width='50px'></a></td><td><a target='_blank' href='https://www.twitch.tv/" + user + "'>" + name + "</a></td><td><a target='_blank' href='https://www.twitch.tv/" + user + "'>" + status + "</a></td></tr>");
} else {
    $('#res').append("<tr class='offline'><td><a target='_blank' href='https://www.twitch.tv/" + user + "'><img src='user_placeholder.png' width='50px'></a></td><td><a target='_blank' href='https://www.twitch.tv/" + user + "'>" + user + "</a></td><td><a target='_blank' href='https://www.twitch.tv/" + user + "'>(currently offline)</a></td></tr>");
    }
}

var ajax = (streamer) => {
    $.ajax({
        url: 'https://wind-bow.gomix.me/twitch-api/streams/' + streamer + "?callback=?",
        data: {format: 'json'},
        dataType: 'jsonp',
        success: (json) => {
            getData(json);
        },
        error: (err) => {
            console.log(err);
        }
    }
)};

$(".online-btn").on('click', () => {
    if ($(".online-btn").hasClass('active') == false) {
        $(".all-btn").removeClass('active');
        $(".offline-btn").removeClass('active');
        $(".online-btn").addClass('active');
        $(".offline").hide();
        $(".online").show();
    }
});
$(".offline-btn").on('click', () => {
    if($(".offline-btn").hasClass('active') == false) {
        $(".all-btn").removeClass('active');
        $(".online-btn").removeClass('active');
        $(".offline-btn").addClass('active');
        $(".online").hide();
        $(".offline").show();
    }
});
$(".all-btn").on('click', () => {
    if($(".all-btn").hasClass('active') == false) {
        $(".online-btn").removeClass('active');
        $(".offline-btn").removeClass('active');
        $(".all-btn").addClass('active');
        $(".offline").show();
        $(".online").show();
    }
});


$(document).ready( () => {
    for (var i = 0; i < channels.length; i++) {
        ajax(channels[i]);
    }
});


$('#query').keypress (function(e) {
    if (e.which == 13) {//Enter key pressed
        $('#search-btn').click();//Trigger search button click event
        this.select(); // selects input for deletion
    }
});
$('#query').keyup (function(e) {
    if (e.which == 8) { // backspace (delete) key reloads the page
        console.log('works');
        window.location.reload();
    }
})
$('#search-btn').click (function() {
    console.log(searchTwitchChannels)
    $('#res').html(" ");
    searchTwitchChannels();
});
function searchTwitchChannels() {
    var query = $('#query').val();
    var url = "https://wind-bow.glitch.me/twitch-api/streams/" + query;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        success: function(res) {
            console.log(res);
            getData(res);
        },
        error: function(err){
            console.log(err);
            alert("Could not retrieve search results, try refreshing the page.");
        }
    });
};

    // // // AJAX call
    // // function twitchStreamCheck() {
    // //     for (var i = 0; i < streamArr.length; i++) {
    // //         $.ajax({
    // //             url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamArr[i] + "?callback=?",
    // //             dataType: 'jsonp',
    // //             data: {format: 'json'},
    // //             success: function(res) {
    // //                 console.log("Success");
    // //                 getData(res);
    // //             },
    // //             error: function(err) {
    // //                 console.log(err);
    // //                 alert("Could not retrieve streamer data, try refreshing the page.");
    // //             }
    // //         });
    // //     };
    // // };
    
    // getData();
    // function showOnline () {
    //     $(".offline-users, .all-users").removeClass('focus');
    //     $(".online-users").addClass('focus');
    //     $(".offline, .unavailable").addClass('hidden');
    //     $(".online").removeClass('hidden');
    // }

    // function showOffline () {
    //     $(".online-users, .all-users").removeClass('focus');
    //     $(".offline-users").addClass('focus');
    //     $(".offline, .unavailable").removeClass('hidden');
    //     $(".online").addClass('hidden');
    // }

    // function showAll () {
    //     $(".offline-users, .online-users").removeClass('focus');
    //     $(".all-users").addClass('focus');
    //     $(".online, .offline, .unavailable").removeClass('hidden');
    // }
    // // Filter buttons
    // $(".online-users").click(function() {
    //     showOnline();
    // });
    // $(".offline-users").click(function() {
    //     showOffline();
    // });
    // $(".all-users").click(function() {
    //     showAll();
    // });
    // $(document).ready( () => {
    //     for (var i = 0; i < streamArr.length; i++) {
    //           ajax(streamArr[i]);
    //     }
    //   });



