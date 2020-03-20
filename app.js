var scores,roundScore;          // score for players and roundscore
var activePlayer;				// Current player in action
var gameState;					// Game status
var pastRoll;					// For past dice value
var presentRoll;				// For present dice value


init();



// On clicking roll dice button
document.querySelector('.btn-roll').addEventListener('click',function(){
if(gameState){
// 1. Set Dice value
var dice=Math.floor(Math.random()*6+1);
presentRoll=dice;

//2. Changing the dice image
var diceDOM=document.querySelector('.dice');
diceDOM.style.display='block';
diceDOM.src='dice-'+dice+'.png';


//4. If dice value is 1
if(dice===1)
{
	changePlayer();
}
else{
	roundScore+=dice;
	document.querySelector('#current-'+activePlayer).textContent=roundScore;
}


}


//5. If there are two 6 in a row
if(pastRoll===6&&presentRoll===6)
{
	pastRoll=0;							// For second player to play
	scores[activePlayer]=0;
	document.querySelector('#score-'+activePlayer).textContent=0;
	changePlayer();
}
else{
pastRoll=dice;
}	
});




document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gameState){
	//1. Store the scores
	scores[activePlayer]+=roundScore;


	//2. Update the UI
	document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];



	//3. Check if player wins
	if(scores[activePlayer]>=100)
	{
		document.querySelector('#name-'+activePlayer).textContent='Winner!';
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		document.querySelector('.dice').style.display='none';
		gameState=false;
	}
	else{

		//4. Player Change
		changePlayer();
	}
}
});


document.querySelector('.btn-new').addEventListener('click',init);

function changePlayer(){
	document.querySelector('.dice').style.display='none';
	roundScore=0;
	document.querySelector('#current-'+activePlayer).textContent=0;
	activePlayer===0?activePlayer=1:activePlayer=0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
	scores=[0,0];					// score is an array of 2 players
	roundScore=0;
	activePlayer=0;
	gameState=true;


	//  Initialising all the values to 0
	document.querySelector('.dice').style.display='none';
	document.querySelector('#score-0').textContent=0;
	document.querySelector('#score-1').textContent=0;
	document.querySelector('#current-0').textContent=0;
	document.querySelector('#current-1').textContent=0;
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}