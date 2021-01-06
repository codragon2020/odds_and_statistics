$(document).ready(function(){
    
    // Submit method to pull content from movieForm and run event function
    $("#statsForm").submit(function(event) {
        event.preventDefault();
        console.log('button was pushed');

        // Variable to be used in url for API call 
        var team = null;

        // Result will be displayed in html
        var result = ""
        
        // API Call configuration
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-nba-v1.p.rapidapi.com/teams/nickName/" + team,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e6bd58beaamshb738f0d07d4ab00p183921jsn790d8fb0fded",
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
            }
        };
        // AJAX call
        $.ajax(settings).done(function (response) {
            team = $("#team").val()
            console.log(team);
            console.log(response); // returns nickName i.e. Hornets, and data of team
            console.log(response.fullName); // undefined


            // Result to be displayed
            result = `
            <img style="float:left" class="img-thumnail" width="200" height="200" src="${response.logo}"/>
            <h5>Team: ${response.fullName}</h5>
            <h5>City: ${response.city}</h5>
            `
            // Actually displaying the result in html
            $("#result").html(result);
        });
    })
})