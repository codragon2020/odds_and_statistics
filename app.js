$(document).ready(function(){
    // New line test
    // Instructions modal function
    var instructionsBtn = $("#instructionsButton")
    var instructionsModal = $("#modalInstructions")
        
    instructionsBtn.click(function(event) {
        event.preventDefault();
        instructionsModal.modal("show");
    
        });
    
    
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
        
        }
    }
    var localStorage = {};
    var keyCount = 0;
    var teamStore = null;
    var teamStoreName = null;

    // Submit method to pull content from movieForm and run event function
    $("#inputForm").submit(function(event) {
        event.preventDefault();
        console.log('button was pushed');

        // Variable to be used in url for API call 
        var team = $("#inputTeam").val();       
        
        inputRequired();
        
        if (missingInput == true) {
            console.log('missingInput = True');
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

            var teamStoreName = $(".list-group").addClass("list-group-item");
            teamStoreName.append("<li>" + team + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, team);
            keyCount = keyCount + 1;

            var teamId = response.api.teams[0].teamId;
            console.log('TeamId stored to variable', teamId);

            // Result to be displayed
            teamResult = `
            <img class="img-thumnail displayed" width="200" height="200" src="${response.api.teams[0].logo}"/>
            `
            $("#showGif").html(teamResult);

            teamStats(teamId);
        });
    })

    for (var i = 0; i < localStorage.length; i++) {
        var teamStore = localStorage.getItem(i);
        console.log(teamStore);
        var teamStoreName = $(".list-group").addClass("list-group-item");
        teamStoreName.append("<li>" + teamStore + "</li>");
        }
        

    function teamStats(teamId) {
        // teamId = 18;
        console.log(teamId);  // pulls the teamId

        // var year = 2019;
        var year = $("#inputSeason").val();

        if (year < 2018) {

            // Set error message on ALERT modal
            $("#yearLimit").text("The data only goes back 3 years");

            // Display Year Limit modal
            $("#modalError").modal({
                backdrop: 'static',
                keyboard: false
            });
            
            return;
        }

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
                    console.log(response.api.standings[i])
                    console.log(response.api.standings[i].loss)

                    var win = response.api.standings[i].win
                    var loss = response.api.standings[i].loss
                    var confRank = response.api.standings[i].conference.rank
                    var divRank = response.api.standings[i].division.rank
                    var winPercent = response.api.standings[i].winPercentage
                    var winStreak = response.api.standings[i].winStreak
                    break;
                }
            };
            $("#win_loss").html(win + '/' + loss);
            $("#conf_rank").html(confRank);
            $("#div_rank").html(divRank);
            $("#win_percent").html(winPercent);
            $("#win_streak").html(winStreak);
        })
    }
})