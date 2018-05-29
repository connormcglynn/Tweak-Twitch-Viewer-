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
        $('#res').append("<tr id='resultdiv'><td>"+res.display_name+"</td><td>"+res.status+"</td><a target='_blank' href='"+res.url+"'><td>"+'Visit site'+"</td></a></div>");
    }
});