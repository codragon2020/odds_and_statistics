$(document).ready(function(){
    
    var missingInput = false;

    function inputRequired() {
        // User must input Team name and Year before clicking Search
        // If player has not entered team name or year show alert message
        if ($('#inputTeam').val() === "" | $('#inputSeason').val() === "") {
            console.log("input is empty")
            missingInput = true;

            // Set error message on ALERT modal
            $("#errorText").text("You must enter the Team Name and Year");

            // Display ALERT modal
            $("#modalError").modal({
                backdrop: 'static',
                keyboard: false
            });
            // Exit
            return;
        } else {
            return;
        }
    }

    // Submit method to pull content from movieForm and run event function
    $("#inputForm").submit(function(event) {
        event.preventDefault();
        console.log('button was pushed');

        // Variable to be used in url for API call 
        var team = $("#inputTeam").val();       
        
        inputRequired();

        if (missingInput = true) {
            return;
        }

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
            // team = $("#inputTeam").val()
            console.log(team);
            console.log(response.api.teams[0].teamId); // TeamId

            var teamId = response.api.teams[0].teamId;
            console.log('TeamId stored to variable', teamId);

            // Result to be displayed
            teamResult = `
            <img style="float:left" class="img-thumnail" width="200" height="200" src="${response.api.teams[0].logo}"/>
            `
            $("#showGif").html(teamResult);

            teamStats(teamId);
        });
    })

    function teamStats(teamId) {
        // teamId = 18;
        console.log(teamId);  // pulls the teamId

        // var year = 2019;
        var year = $("#inputSeason").val();

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
            console.log(response.api.standings[0].teamId); // teamId of standings[0]
            
            // For Loop to match teamId with response
            var standings = response.api.standings;
            
            for ( var i = 0; i < standings.length; i++ ) {
                if ( standings[i].teamId === teamId ) {
                    // responseTeamId = standings[i];
                    console.log('Inside the for loop, found it ', teamId);
                    console.log(response.api.standings[i].win)
                    console.log(response.api.standings[i].loss)

                    var win = response.api.standings[i].win
                    var loss = response.api.standings[i].loss
                    break;
                }
            };
            $("#win_loss").html(win + '/' + loss);
        })
    }

    // User must input Team name and Year before clicking Search
    // $("#searchButton").on("click", function (e) {
    //     e.preventDefault();

    //     // If player has not entered team name or year show alert message
    //     if ($('#inputTeam').val() === "" | $('#inputSeason').val() === "") {
    //         console.log("input is empty")
    //         // Set error message on ALERT modal
    //         $("#errorText").text("You must enter the Team Name and Year");

    //         // Display ALERT modal
    //         $("#modalError").modal({
    //             backdrop: 'static',
    //             keyboard: false
    //         });
    //         // Exit
    //         return;
    //     };
    // })
})