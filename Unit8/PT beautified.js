done using https://beautifier.io

//variables
var playerChoicesList = ["icon://fa-male", "icon://fa-female", "icon://fa-bug", "icon://fa-plane", "icon://fa-car", "icon://fa-rocket", "icon://fa-heart", "icon://fa-heart"];
var score = 0;
var scoreList = [0, 0, 0];
var playerRight;
var playerLeft;
var playerTop;
var playerBottom;
var playerRightList = [26, 28, 30, 30, 34, 31, 31];
var playerLeftList = [10, 9, 7, 8, 3, 7, 5];
var playerTopList = [6, 6, 6, 6, 6, 6, 6];
var playerBottomList = [32, 32, 30, 28, 31, 31, 30];
var nameList = [];
var playerName = " ";

//sets the colors for the player and asteroids
function coloring(whichone, color) {
    if (whichone == "player") {
        setProperty(whichone, "icon-color", color);
    } else if (whichone == "asteroid") {
        for (var i = 1; i < 31; i++) {
            setProperty("Asteroid" + i, "icon-color", color);
        }
    } else if (whichone == "random") {
        setProperty("player", "icon-color", rgb(randomNumber(1, 255), randomNumber(1, 255), randomNumber(1, 255)));
        for (var j = 1; j < 31; j++) {
            setProperty("Asteroid" + j, "icon-color", rgb(randomNumber(1, 255), randomNumber(1, 255), randomNumber(1, 255)));
        }
    }
}

//function for making the game run
function gameTime() {
    setScreen("GameScreen");
    score = 0;
    //resets the position and rehides the asteroids whenever the game restarts
    for (var k = 1; k < 31; k++) {
        setProperty("Asteroid" + k, "hidden", true);
        setProperty("Asteroid" + k, "x", -50);
        setProperty("Asteroid" + k, "y", 5);
    }

    var i = 1;
    //loop to control putting the astroids on the x axis
    timedLoop(2000, function() {
        setProperty("Asteroid" + i, "hidden", false);
        setProperty("Asteroid" + i, "x", randomNumber(-5, 280));
        setProperty("Asteroid" + i, "y", 5);
        if (i < 30) {
            i++;
        }
    });
    //loop to make the asteroids go down
    timedLoop(100, function() {
        for (var j = 1; j < 31; j++) {
            setProperty("Asteroid" + j, "y", getYPosition(("Asteroid" + j)) + 5);

            if ((getYPosition("Asteroid" + j) > 420) && (getProperty(("Asteroid" + j), "hidden") == false) && getProperty("player", "image") == "icon://fa-heart") {
                setProperty("Asteroid" + j, "y", 5);
                setProperty("Asteroid" + j, "x", randomNumber(-5, 280));
            }

            if ((getXPosition("player") + playerRight >= getXPosition("Asteroid" + j) + 12) &&
                (getXPosition("player") + playerLeft <= getXPosition("Asteroid" + j) + 40) &&
                (getYPosition("player") + playerTop <= getYPosition("Asteroid" + j) + 43) &&
                (getYPosition("player") + playerBottom >= getYPosition("Asteroid" + j) + 10)) {
                stopTimedLoop();
                setScreen("NameScreen");
            }
        }
    });
}


onEvent("GameScreen", "keydown", function(event) {

    if (event.key == "Left" || event.key == "a") {
        if (getXPosition("player") > 0) {
            setProperty("player", "x", getXPosition("player") - 10);
        }
    } else if (event.key == "Right" || event.key == "d") {
        if (getXPosition("player") < 290) {
            setProperty("player", "x", getXPosition("player") + 10);
        }
    }
});
//runs the game and keeps score
onEvent("optionsButton", "click", function() {
    gameTime();
    timedLoop(1000, function() {
        score = score + 1;
    });

    for (var un = 1; un < 31; un++) {
        if ((getProperty("Asteroid" + un, "icon-color") == "White") && (getProperty("player", "icon-color") == "red")) {
            setProperty("Asteroid" + un, "image", "bone.png");

        }

    }

});
onEvent("replayButton", "click", function() {
    gameTime();
    timedLoop(1000, function() {
        score = score + 1;
    });
});

//changing screens buttons

onEvent("startButton", "click", function() {
    setScreen("InstructionScreen");
});
onEvent("instructionsButton", "click", function() {
    if (score >= 30) {
        setProperty("lockButton", "hidden", true);
    }
    setScreen("OptionsScreen");

});
onEvent("returnButton", "click", function() {
    setScreen("TitleScreen");
});
//sets the text for the leaderboard
onEvent("nameButton", "click", function() {

    if (playerName == " ") {
        playerName = "player name";
    } else {
        playerName = getText("nameInput");
    }
    appendItem(nameList, playerName);
    insertItem(scoreList, 0, score);
    if (nameList.length > 1) {
        for (var length = 0; length <= 2; length++) {
            setProperty("leaderboard", "text",
                "Current score:" + "\n" +
                "1." + " " + nameList[0] + ":" + scoreList[0] + "\n" +
                "Previous score:" + "\n" +
                "2." + " " + nameList[1] + ":" + scoreList[1]
            );
        }
    } else {
        setProperty("leaderboard", "text", "Current score:" + "\n" +
            "1." + " " + nameList[0] + ":" + scoreList[0]);
    }
    setScreen("LeaderboardScreen");
});
//player colors
onEvent("playerBlackButton", "click", function() {
    coloring("player", "black");
});
onEvent("playerWhiteButton", "click", function() {
    coloring("player", "white");
});
onEvent("playerBlueButton", "click", function() {
    coloring("player", "blue");
});
onEvent("playerRedButton", "click", function() {
    coloring("player", "red");
});
//asteroid colors
onEvent("asteroidBlackButton", "click", function() {
    coloring("asteroid", "black");
});
onEvent("asteroidWhiteButton", "click", function() {
    coloring("asteroid", "White");
});
onEvent("asteroidBlueButton", "click", function() {
    coloring("asteroid", "blue");
});
onEvent("asteroidRedButton", "click", function() {
    coloring("asteroid", "red");
});
//random colors button
onEvent("randomButton", "click", function() {
    coloring("random");
});
//icon choices
onEvent("icon1Button", "click", function() {
    setProperty("player", "image", "icon://fa-male");
    playerRight = playerRightList[0];
    playerLeft = playerLeftList[0];
    playerTop = playerTopList[0];
    playerBottom = playerBottomList[0];
});
onEvent("icon2Button", "click", function() {
    setProperty("player", "image", "icon://fa-female");
    playerRight = playerRightList[1];
    playerLeft = playerLeftList[1];
    playerTop = playerTopList[1];
    playerBottom = playerBottomList[1];
});
onEvent("icon3Button", "click", function() {
    setProperty("player", "image", "icon://fa-bug");
    playerRight = playerRightList[2];
    playerLeft = playerLeftList[2];
    playerTop = playerTopList[2];
    playerBottom = playerBottomList[2];
});
onEvent("icon4Button", "click", function() {
    setProperty("player", "image", "icon://fa-plane");
    playerRight = playerRightList[3];
    playerLeft = playerLeftList[3];
    playerTop = playerTopList[3];
    playerBottom = playerBottomList[3];
});
onEvent("icon5Button", "click", function() {
    setProperty("player", "image", "icon://fa-car");
    playerRight = playerRightList[4];
    playerLeft = playerLeftList[4];
    playerTop = playerTopList[4];
    playerBottom = playerBottomList[4];
});
onEvent("icon6Button", "click", function() {
    setProperty("player", "image", "icon://fa-rocket");
    playerRight = playerRightList[5];
    playerLeft = playerLeftList[5];
    playerTop = playerTopList[5];
    playerBottom = playerBottomList[5];
});
onEvent("icon7Button", "click", function() {
    setProperty("player", "image", "icon://fa-heart");
    playerRight = playerRightList[6];
    playerLeft = playerLeftList[6];
    playerTop = playerTopList[6];
    playerBottom = playerBottomList[6];
});

//sets the default choice for the player
var randomIcon = randomNumber(0, 6);
setProperty("player", "image", playerChoicesList[randomIcon]);
playerRight = playerRightList[randomIcon];
playerLeft = playerLeftList[randomIcon];
playerTop = playerTopList[randomIcon];
playerBottom = playerBottomList[randomIcon];
