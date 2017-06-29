$(document).ready(function() {

	//Global Variables
	//=================================================

	var userCharacter;
	var userHealth; 
	var enemyCharacter;
	var enemyHealth;
	//Manage various roles of gameplay
	//Four states: choosePlayer, chooseOpponent, attack, gameOver
	var gameState = "choosePlayer";
	var availableEnemies = [];
	var playerId;
	var defenderId;

	//Characters
	//=================================================
	var playableCharacters = [

		{
			"id": 0,
			"name": "maverick",
			"health": 130,
			"attack": 13,
			"power": 13,
			"counter": 12,
			"image": "./assets/images/maverick.jpeg"
		},

		{
			"id": 1,
			"name": "goose",
			"health": 100,
			"attack": 7,
			"power": 7,
			"counter": 9,
			"image": "./assets/images/goose.jpg"
		},

		{
			"id": 2,
			"name": "iceman",
			"health": 150,
			"attack": 10,
			"power": 10,
			"counter": 14,
			"image": "./assets/images/iceman.jpg"
		},

		{
			"id": 3,
			"name": "merlin",
			"health": 120,
			"attack": 9,
			"power": 9,
			"counter": 9,
			"image": "./assets/images/merlin.jpg"
		}
	];


	//Functions
	//================================================
	//Displays characters on screen
	function renderCharacters() {
		for (var i = 0; i < playableCharacters.length; i++) {
			var characters = $("<div>");
			var image = "<img src='"+playableCharacters[i].image+"'>";
			var name = "<h3>"+playableCharacters[i].name+"</h3>";
			var health = "<h4 class='hp'>"+playableCharacters[i].health+" HP</h4>";
			characters.addClass("you");
			characters.attr("id", i);
			characters.attr("hp", playableCharacters[i].health);
			characters.html(name);
			characters.append(image);
			characters.append(health);
			$("#characters").append(characters);
		}
	}
	renderCharacters();

	function checkIfPlayerLost() {
		if (playableCharacters[playerId].health <= 0) {
			chooseYourPlayer = 0;
			enemyCharacterChoice = 0;
			wins = 0;
			alert("You've been killed in action.");
			renderCharacters();
			// $("#yourPlayer").empty();
			// $("#yourPlayer").append("<div id='yourPlayer'></div>");
			// $("#characters").empty();
			// $("#characters").
		}
	}

	function checkIfPlayerWon() {
		if (playableCharacters[defenderId].health <= 0) {
			enemyCharacterChoice = 0;
			wins++;
			alert("You beat " + playableCharacters[defenderId].name + "!");
			$("#yourPlayer").hide();
			$(".currentDefender").remove();
			$("#message").html("");
			$("#characters").append(futureEnemies);
			$("#instructions").html("Choose an Opponent");
		}
		if (wins === 3) {
			$("#instructions").html("");
			alert("YOU WON!");

		}
	}
	
	$("#attackButton").css("visibility", "hidden");

	// console.log(characters);
	// var heroSelectedCounter = 
	//Pick your character
	// function selectCharacters(char) {
	$("#instructions").html("Choose a Character");

	var chooseYourPlayer = 0;
	var player;

	$("body").on("click", ".you", function(event) {
		if (chooseYourPlayer === 0) {
			playerId = $(this).attr("id");
			$(this).addClass("good");
			$(this).removeClass("you");
			$(this).siblings("div").addClass("evil");
			$(this).siblings("div").removeClass("you");
			player = $(this).detach();
			userHealth = $(this).attr("hp");
			userCharacter = "";
			userCharacter = playableCharacters[playerId];
			$("#instructions").html("Choose an Opponent");
			chooseYourPlayer++;	
			// console.log(playerId);
			// console.log(userCharacter);
		}
	})

	var enemyCharacterChoice = 0;
	var futureEnemies;

	$("body").on("click", ".evil", function() {
		if (enemyCharacterChoice === 0) {
			console.log("You clicked");
			defenderId = $(this).attr("id");
			$(this).addClass("currentDefender");
			var currentEnemy = $(this).detach();
			futureEnemies = $(".evil").detach();
			// Move the characters to chooseCharacters div
			$("#yourPlayer").append(player);
			$("#enemy").append(currentEnemy);
			$("#instructions").html("Click Fire to Engage");
			$("#attackButton").css("visibility", "visible");
			$("#yourPlayer").show();
			enemyCharacterChoice++;
			

			enemyCharacter = "";
			var aId = $(this).attr("id");
			userHealth = $(this).attr("hp");
			enemyCharacter = playableCharacters[aId];
			// console.log(enemyCharacter.attack);
			// $(char).off("click.player");
			// $("#selectable").off("click.player");	
		}
	});
	

	// $(".selectable").unbind("click").bind("click", function() {
	// 	selectCharacters(this);
	// 	$(this).unbind("click");
	// })

	var wins = 0;
	var attackCounter;

	$("body").on("click", "#attackButton", function() {
		if (enemyCharacterChoice === 1) {
			console.log(playableCharacters[playerId].health);
			playableCharacters[playerId].health = playableCharacters[playerId].health - playableCharacters[defenderId].counter;
			playableCharacters[defenderId].health = playableCharacters[defenderId].health - playableCharacters[playerId].attack;
			console.log(playableCharacters[playerId].health);

		 	if (playableCharacters[playerId].health > 0) {
		 		$(".good>h4").html(playableCharacters[playerId].health + " HP");
		 	} else {
		 		playableCharacters[playerId].health = 0;
		 		$(".good>h4").html(playableCharacters[playerId].health + " HP");
		 		$("#attackButton").css("visibility", "hidden");
		 	}

		 	if (playableCharacters[defenderId].health > 0) {
		 		$(".evil>h4").html(playableCharacters[defenderId].health + " HP");
		 	} else {
		 		playableCharacters[defenderId].health = 0;
		 		$(".evil>h4").html(playableCharacters[defenderId].health + " HP");
		 		$("#attackButton").css("visibility", "hidden");
		 	}

		 	$("#message").html("You attacked for " + playableCharacters[playerId].attack + " damage.<br>");
			$("#message").append(playableCharacters[defenderId].name + " attacked for " + playableCharacters[defenderId].counter + " damage.");
			playableCharacters[playerId].attack = playableCharacters[playerId].attack + 10;

			checkIfPlayerLost();
			checkIfPlayerWon();
		}
	})



















});