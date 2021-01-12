$(document).ready(function(){
 
    $("#team_list").on("click", ".game", function() {
        var team1Odds = $(this).data("oddsteam1")
        var team2Odds = $(this).data("oddsteam2")
        var team1 = $(this).text().split(" vs. ")[0];
        var team2 = $(this).text().split(" vs. ")[1];
        // console.log('Team 1 ', team1);
        // console.log('Team 1 Odds ', team1Odds);

        oddsResult = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">TEAMS</th>
                    <th scope="col">${team1}</th>
                    <th scope="col">${team2}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">h2h</th>
                        <td>${team1Odds}</td>
                        <td>${team2Odds}</td>
                    </tr>
                </tbody>
                </table>
            `
            // Actually displaying the result in html
            $("#result").html(oddsResult);
    })

    // Odds may be unavailable if the sport is not in season. 
    // Odds may temporarily become unavailable if bookmakers stop listing games in between rounds. 
    // If no odds are returned, the request will not count against the usage quota.
    $("#oddsForm").submit(function(event) {
        event.preventDefault();
        // console.log('button was pushed');

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://odds.p.rapidapi.com/v1/odds?sport=basketball_nba&region=us&mkt=h2h&dateFormat=iso&oddsFormat=decimal",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e6bd58beaamshb738f0d07d4ab00p183921jsn790d8fb0fded",
                "x-rapidapi-host": "odds.p.rapidapi.com"
            }
        };

        $.ajax(settings).done(function (response) {
            // console.log(response);
            
            // Loop the data array and create a <p> and store the elements
            response.data.forEach(function(element) {
                var gameEl = $('<p>');
                gameEl.addClass('game');
                gameEl.text(element.teams[0] + " vs. " + element.teams[1]);
                // data- 
                gameEl.attr('data-oddsteam1', element.sites[0].odds.h2h[0])
                gameEl.attr('data-oddsteam2', element.sites[0].odds.h2h[1])
                // Append the element to the team list
                $('#team_list').append(gameEl);
            });
        });
    })

    // Odds Page Instructions Modal
    $("#instructionsButton").on("click", function (e) {
        e.preventDefault();
        
        // Clear all content
        $("#oddsInstructionText").html("");
        
        // Create unordered list of instructions
        var instructList = $('<ul>').appendTo('#oddsInstructionText');
            $('<li>').text('Click on the "Show Teams Playing" Button').appendTo(instructList);
            $('<li>').text('Review list of games by Visitor vs. Home teams').appendTo(instructList);
            $('<li>').text('Click on a listed Game').appendTo(instructList);
            $('<li>').text('View the Results of the Head-to-Head Odds').appendTo(instructList);
            $('<li>').text('Good Luck!').appendTo(instructList);

        // Display Instructions modal
        $("#modalInstructions").modal({
            backdrop: 'static',
            keyboard: false
        });
    })
})
