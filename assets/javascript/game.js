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

	var haveCharacter = false;
	var haveAttacker = false;


	//Functions
	//================================================
	//Displays characters on screen
	function renderCharacters() {
		for (var i = 0; i < playableCharacters.length; i++) {
			var characters = $("<div>");
			var image = "<img src='"+playableCharacters[i].image+"'>";
			var name = "<h3>"+playableCharacters[i].name+"</h3>";
			var health = "<h4 class='hp'>"+playableCharacters[i].health+" HP</h4>";
			characters.addClass("character-image selectable");
			characters.attr("id", i);
			characters.attr("hp", playableCharacters[i].health);
			characters.html(name);
			characters.append(image);
			characters.append(health);
			$("#characters").append(characters);
			// console.log(health);
		}
	}
	renderCharacters();


	
	$("#attackButton").css("visibility", "hidden");

	// console.log(characters);
	
	//Pick your character
	function selectCharacters(char) {
		
	// $(".selectable").on("click.player", function() {
	if (!haveCharacter) {
		$(char).removeClass("selectable");
		$(char).addClass("selected");
		haveCharacter = true;
		var pId = $(char).attr("id");
		userHealth = $(char).attr("hp");
		userCharacter = "";
		userCharacter = playableCharacters[pId];
		console.log(userCharacter.health);
		$("#instructions").html("Choose an Opponent");
		// $(char).unbind().("disable player");
		// $(".character-image").off("click.player");
	}
	else if (!haveAttacker) {
		$(char).removeClass("selectable");
		$(char).addClass("enemy");
		$(".selectable").addClass("notSelected");
		$(".selectable").removeClass("selectable");
		$(".notSelected").hide();
		$("#characters").hide();
		// Move the characters to chooseCharacters div
		$(".enemy").clone().appendTo($("#enemy"));
		$(".selected").clone().appendTo($("#yourPlayer"));
		haveAttacker = true;
		enemyCharacter = "";
		var aId = $(char).attr("id");
		userHealth = $(char).attr("hp");
		enemyCharacter = playableCharacters[aId];
		console.log(enemyCharacter.attack);
		$(char).off("click.player");
		$("#selectable").off("click.player");
		$("#attackButton").css("visibility", "visible");
		$("#instructions").html("Click Fire to Engage");
	}
	}
	
	$(".selectable").unbind("click").bind("click", function() {
		selectCharacters(this);
		$(this).unbind("click");
	})

	$("#attackButton").on("click", function() {
		console.log("PLAYER HEALTH: " + userCharacter.health);
		console.log("PLAYER DAMAGE: " + userCharacter.attack);
		enemyCharacter.health -= userCharacter.attack;
		console.log("Opponent Health After Attack: " + enemyCharacter.health);
		
		userCharacter.health -= enemyCharacter.counter;
		console.log("Enemy Counter Attack " + enemyCharacter.counter);
		console.log("PLAYER HEALTH AFTER COUNTER " + userCharacter.health);

		userCharacter.attack += userCharacter.power;

		if (userCharacter.health > 0) {
			$(".selected>h4").html(userCharacter.health + " HP");
		} else {
			$(".selected>h4").text("DEFEATED");
			$("#attack").addClass("disabled");
		}
		if (enemyCharacter.health > 0) {
			$(".enemy>h4").html(enemyCharacter.health + " HP");
		} else {
			$(".enemy>h4").text("DEFEATED");
			$("#attack").addClass("disabled");
		}
		$("#message").html("You attacked for " + userCharacter.attack + " damage.<br>");
		$("#message").append(enemyCharacter.name + " attacked for " + enemyCharacter.counter + " damage.");
		
		
	})



















});