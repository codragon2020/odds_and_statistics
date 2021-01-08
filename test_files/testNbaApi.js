$(document).ready(function(){
    
    function teamStats(teamId) {
        // teamId = 18;
        console.log(teamId);  // pulls the teamId

        var year = 2019;

        var statsResult
        // API Call configuration
        const stats = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-nba-v1.p.rapidapi.com/standings/standard/" + year + "/",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e6bd58beaamshb738f0d07d4ab00p183921jsn790d8fb0fded",
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
            }
        };
        // AJAX call
        $.ajax(stats).done(function (response) {
            console.log(teamId); // pulls the teamId
            console.log(response); // "GET standings/standard/2019"
            console.log(response.api.standings[0]);
            console.log(response.api.standings);
            console.log(response.api.standings[0].teamId); // teamId of standings[0]
            
            // For Loop to match teamId with response
            var standings = response.api.standings;
            
            for ( var i = 0; i < standings.length; i++ ) {
                if ( standings[i].teamId === teamId ) {
                    // responseTeamId = standings[i];
                    console.log('Inside the for loop, found it ', teamId);
                    console.log(response.api.standings[i].win)
                    console.log(response.api.standings[i].loss)
                    break;
                }
            };
            
            // Result to be displayed
            statsResult = `
            <h5>Wins: ${response.api.standings[i].win}</h5>
            <h5>Loses: ${response.api.standings[i].loss}</h5>
            `
            // Actually displaying the result in html
            $("#statsResult").html(statsResult);

        })
    }

    // Submit method to pull content from movieForm and run event function
    $("#statsForm").submit(function(event) {
        event.preventDefault();
        console.log('button was pushed');

        // Variable to be used in url for API call 
        var team = $("#team").val()        
        // var team = null;

        // Result will be displayed in html
        var teamResult = ""
        
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
            console.table(response); // returns nickName i.e. Hornets, and data of team
            console.log(response.api.teams[0].teamId); // TeamId

            var teamId = response.api.teams[0].teamId;
            console.log('TeamId stored to variable', teamId);

            // Result to be displayed
            teamResult = `
            <img style="float:left" class="img-thumnail" width="200" height="200" src="${response.api.teams[0].logo}"/>
            <h5>Team: ${response.api.teams[0].fullName}</h5>
            <h5>City: ${response.api.teams[0].city}</h5>
            `
            // Actually displaying the result in html
            $("#teamResult").html(teamResult);
            teamStats(teamId);
        });

        // teamStats(); 

    })


})