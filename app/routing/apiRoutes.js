var friendData = require("../data/friends");


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);


    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware


        var user = req.body;

        // Utilizing parseInt for scores to work
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriendIndex = 0;
        var minimumDifference = 40;

        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friendData[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friendData[i].scores[j]);
                totalDifference += difference;
            }

            // if new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        // after match, add survey taker to friend array
        friendData.push(user);

        //friendData.push(req.body);
        // res.json(true);
        res.json(friendData[bestFriendIndex]);



    });

    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware


    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

};