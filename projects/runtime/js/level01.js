var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "reward", "x": 1700, "y": groundY - 120},
                { "type": "reward", "x": 1300, "y": groundY - 20},
                { "type": "reward", "x": 2500, "y": groundY - 20},
                { "type": "enemy", "x": 2000, "y": groundY - 20},
                { "type": "enemy", "x": 1500, "y": groundY - 20},
                { "type": "enemy", "x": 2500, "y": groundY - 20},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;  
        };
        
        createSawBlade(1000, 470);
        createSawBlade(1500, 350);
        createSawBlade(2000, 420);

        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -4;
            enemy.rotationalVelocity = 20;

            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-30)
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.flyTo(1500,groundY);
            };
        };

        createEnemy(1000, groundY - 50);
        createEnemy(1400, groundY - 50);
        createEnemy(2100, groundY - 50);

        function createReward(x, y) {
            var reward = game.createGameItem("reward", 20);
            var goldCoin = draw.circle(20, 20, "gold");
            goldCoin.x = 0;
            goldCoin.y = 0;
            reward.addChild(goldCoin);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
            reward.rotationalVelocity = 5;

            reward.onPlayerCollision = function () {
                game.changeIntegrity(40);
                game.increaseScore(250);
            };
        };

        createReward(1700, groundY - 120)
        createReward(1300, groundY - 20)
        createReward(2500, groundY - 20)

        function createMarker(x, y) {
            var marker = game.createGameItem("marker", 20);
            var markerDecal = draw.circle(20, 20, "green");
            markerDecal.x = 0;
            markerDecal.y = 0;
            marker.addChild(markerDecal);
            marker.x = x;
            marker.y = y;
            game.addGameItem(marker);
            marker.velocityX = -2;

            marker.onPlayerCollision = function () {
                startLevel()
            };
            
            marker.onProjectileCollision = function () {
                startLevel()
            };
        };

        createMarker(3000, groundY - 30)

        function createObject(x, y) {
            var object = game.createGameItem("marker", 20);
            var objectDecal = draw.circle(20, 20, "green");
            objectDecal.x = 0;
            objectDecal.y = 0;
            object.addChild(objectDecal);
            object.x = x;
            object.y = y;
            game.addGameItem(object);
            object.velocityX = -6;

            object.onPlayerCollision = function () {
                game.changeIntegrity(100)
            };
        };

        createObject(2000, groundY - 100)
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
