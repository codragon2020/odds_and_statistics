$(document).ready(function () {

    // Stats Page Instructions Modal
    $("#instructionsButton").on("click", function (e) {
        e.preventDefault();
        
        // Clear all content
        $("#updateText").html("");
        
        // Create unordered list of instructions
        var instructList = $('<ol>').appendTo('#updateText');
            $('<li>').text('Enter the team you want to get stats for').appendTo(instructList);
            $('<li>').text('Enter the year in which you would like the stats').appendTo(instructList);
            $('<li>').text('Click the "Search" button').appendTo(instructList);
        
        var otherList = $('<ul>').appendTo('#updateText');
            $('<p>').text('Behold stats!').css("font-weight", "bold").appendTo(otherList);
            $('<p>').text('-------------------------------------------------').appendTo(otherList);
            $('<p>').text('Note: The statistics data only goes back 3 years').appendTo(otherList);

        
        // Display Instructions modal
        $("#modalInstructions").modal({
            backdrop: 'static',
            keyboard: false
        });
    })


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

    function searchTeam(team) {
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
        <img class="img-thumnail displayed" width="200" height="200" src="${response.api.teams[0].logo}"/>
        `
            $("#showGif").html(teamResult);

            if (history.indexOf(team) === -1) {
                history.push(team);
                window.localStorage.setItem("history", JSON.stringify(history));
                makeRow(team);
              }
            teamStats(teamId);
        });
    }
    $(".searched").on("click", "li", function() {
        searchTeam($(this).text())
    })
    
    function makeRow(text) {
        var li = $("<li>").text(text);
        $(".searched").append(li)
        
    }
    // Submit method to pull content from movieForm and run event function
    $("#inputForm").submit(function (event) {
        event.preventDefault();
        console.log('button was pushed');

        // Variable to be used in url for API call 
        var team = $("#inputTeam").val();

        searchTeam(team);
        inputRequired();

        if (missingInput == true) {
            console.log('missingInput = True');
            return;
        }

    })




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

            for (var i = 0; i < standings.length; i++) {
                if (standings[i].teamId === teamId) {
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

    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    for (i=0; i < history.length; i++) {
        makeRow(history);
    }

    // clear history click function needs attention 
    // $("#clearHistory").click(function() {
    //     localStorage.clear() 
    //     })
    })


