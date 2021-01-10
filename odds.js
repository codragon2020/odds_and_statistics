$(document).ready(function(){

    $("#inputForm").submit(function(event) {
        event.preventDefault();
        console.log('button was pushed');

        var oddsResult = "";
        // var team1 = null;
        // var team2 = null;

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://odds.p.rapidapi.com/v1/odds?sport=basketball_nba&region=us&mkt=h2h&dateFormat=iso&oddsFormat=decimal",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e6bd58beaamshb738f0d07d4ab00p183921jsn790d8fb0fded",
                "x-rapidapi-host": "odds.p.rapidapi.com"
            // ,
            // "teams": [
            //     team1,
            //     team2
            //     ],
            }
        };

        $.ajax(settings).done(function (response) {
            // team1 = $("#team-1").val();
            // team1 = $("#team-2").val();
            console.log(response);
        });

        oddsResult = `
        <table class="table">
            <thead>
                <tr>
                <th scope="col">TEAMS</th>
                <th scope="col">${response.data[0].teams[0]}</th>
                <th scope="col">${response.data[0].teams[1]}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">h2h</th>
                    <td>${response.data[0].sites[0].odds.h2h[0]}</td>
                    <td>${response.data[0].sites[0].odds.h2h[1]}</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                </tr>
            </tbody>
            </table>
        `
    })
})
