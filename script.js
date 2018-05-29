$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$(document).ready(function() {
    $('#query').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    });
    $('#search-btn').click(function(){
        console.log(callTwitch)
        $('#res').html(" ");
        callTwitch();
    });
    function callTwitch() {
        var query = $('#query').val();
        var url = "https://wind-bow.glitch.me/twitch-api/channels/" + query;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function(res) {
                console.log(res);
                render(res);
            },
            error: function(err){
                console.log(err);
                alert("Could not retrieve search results, try refreshing the page.");
            }
        });
    };
    function render(res){
        $('#res').append("<tr id='resultdiv'><td><a target='_blank' href='"+res.url+"'><img src='"+res.logo+"' width='50px'></a></td><td><a target='_blank' href='"+res.url+"'>"+res.display_name+"</a></td><td class='status'><a target='_blank' href='"+res.url+"'>"+res.status+"</a></td></tr>");
        var resObj = res;
        for (var i in resObj) {
            if ($('.status')[i].innerText == "null") {
                // 
                console.log(res.status);
            } else {
                // console.log(res.status);
            }
        }
    };
    function twitchStreamCheck() {
        var userArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
        userArr.forEach(function (userArr) {
            $.ajax({
                url: "https://wind-bow.glitch.me/twitch-api/channels/" + userArr,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    render(res);
                },
                error: function(err) {
                    console.log(err);
                    alert("Could not retrieve streamer data, try refreshing the page.");

                }
            });
        });

    };
    twitchStreamCheck();
});