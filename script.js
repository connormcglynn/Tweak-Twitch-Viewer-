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
    };
    function sRender(res){ // TRY USING forEach on the res array
        if (res.stream == null){
            $('td').css({'opacity' : '0.5'});
            alert('Hmm, seems like all of the streams are offline. Try searching for a user?')
        }  else {
            console.log('All streams available');
        }
    }
    function twitchChannelCheck() {
        var chanArr = ["EASPORTSFIFA", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
        chanArr.forEach(function (chanArr) {
            $.ajax({
                url: "https://wind-bow.glitch.me/twitch-api/channels/" + chanArr,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    render(res);
                },
                error: function(err) {
                    console.log(err);
                    alert("Could not retrieve channel data, try refreshing the page.");
                }
            });
        });
    };
    twitchChannelCheck();
    function twitchStreamCheck() {
        var streamArr = ["EASports", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
        streamArr.forEach(function (streamArr) {
            $.ajax({
                url: "https://wind-bow.glitch.me/twitch-api/streams/" + streamArr,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    sRender(res);
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