$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

window.onload = function() {
    var status, url, picture, x = 0;
    var streamArr = ["EASportsFIFA", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

    function updateHTML(section) {
        $('#res').append("<tr id='resultdiv'><td><a target='_blank' href='"+res.stream.channel.url+"'><img id='user-image-" + x + "' src='"+res.stream.channel.logo+"' width='50px'></a></td><td><a target='_blank' href='"+res.stream.channel.url+"'>"+res.stream.channel.display_name+"</a></td><td class='status-message'><a target='_blank' href='"+res.stream.channel.url+"'>"+status+"</a></td></tr>");
        if (section == ".online" || section == ".offline") {
            $("#user-image-" + x).css({background: picture, 'background-size': '55px'});
        }
        x++;
    }

    function twitchChannelCheck() {
        $.ajax({
            url: "https://wind-bow.glitch.me/twitch-api/channels/" + streamArr[i],
            dataType: 'jsonp',
            data: {format: 'json'},
            success: function(json) {
                status = "Channel " + "'<a href='" + json.url + "' target='_blank'" + "'>" + json.display_name + "</a>'" + " is currently offline";
                if (json.logo !== null) {
                    picture = 'url("' + json.logo + '")';
                } else {
                    picture = 'url("user_placeholder.png")';
                }
                updateHTML(".offline");
            }
        });
    };

    function getData(res){
        if (res.stream === null) {
            url = res._links.channel.substr(38);
            twitchChannelCheck();
        } else if (res.status == 422 || res.status == 404){
            status = res.message;
            updateHTML(".unavailable");
        } else {
            if (res.stream.channel.logo !== null) {
                picture = 'url("' + res.stream.channel.logo + '")';
            } else {
                picture = 'url("user_placeholder.png")';
            }
            url = res._links.channel.substr(38);
            status = "<a href='https://twitch.tv/" + url + "' target='_blank'" + "'>" + res.stream.channel.display_name +  "</a>" + " is currently streaming " + res.stream.game;
            updateHTML(".online");
        }
    };

    // Using search bar
    $('#query').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    });
    $('#search-btn').click(function(){
        console.log(searchTwitchStreams)
        $('#res').html(" ");
        searchTwitchStreams();
    });
    function searchTwitchStreams() {
        var query = $('#query').val();
        var url = "https://wind-bow.glitch.me/twitch-api/channels/" + query;
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

    // AJAX call
    function twitchStreamCheck() {
        for (var i = 0; i < streamArr.length; i++) {
            $.ajax({
                url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamArr[i] + "?callback=?",
                dataType: 'jsonp',
                data: {format: 'json'},
                success: function(res) {
                    console.log("Success");
                    getData(res);
                },
                error: function(err) {
                    console.log(err);
                    alert("Could not retrieve streamer data, try refreshing the page.");
                }
            });
        };
    };
    // twitchStreamCheck();
    twitchChannelCheck();
    getData();
    function showOnline () {
        $(".offline-users, .all-users").removeClass('focus');
        $(".online-users").addClass('focus');
        $(".offline, .unavailable").addClass('hidden');
        $(".online").removeClass('hidden');
    }

    function showOffline () {
        $(".online-users, .all-users").removeClass('focus');
        $(".offline-users").addClass('focus');
        $(".offline, .unavailable").removeClass('hidden');
        $(".online").addClass('hidden');
    }

    function showAll () {
        $(".offline-users, .online-users").removeClass('focus');
        $(".all-users").addClass('focus');
        $(".online, .offline, .unavailable").removeClass('hidden');
    }
    // Filter buttons
    $(".online-users").click(function() {
        showOnline();
    });
    $(".offline-users").click(function() {
        showOffline();
    });
    $(".all-users").click(function() {
        showAll();
    });
};