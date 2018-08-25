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


    app.post("/api/friends", function (req, res) {


        var user = req.body;

        // Utilizing parseInt for scores to work
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriendIndex = 0;
        var difference = 40;

        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friendData[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friendData[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < difference) {
                bestFriendIndex = i;
                difference = totalDifference;
            }
        }

        friendData.push(user);
        res.json(friendData[bestFriendIndex]);



    });

};