
//Global Variables. These are accessed across multiple functions. 
var selectedCard = undefined;
var selectedParentCard = undefined;
var clicked = false;
var openCards = [];
var remainingMoves = 3;
var clickCount = 0;
var attempts = document.getElementsByClassName("stars");
var successfulMatches = 0;
var won = false;
var lost = false;
var reset = false;
var totalTime = "";

//Sets a variable name for the modal
var banner = document.getElementById('banner');
//Sets a variable name for text content inside the modal
var bannerText = document.getElementById('bannerText');

//Main function. It sets the initial values. Creates a random list with all the symbols and add event listeners to them. Then it adds them to the DOM. This function initializes the game. 
function startGame () {
    //Initial list with all the card symbols.
   let cardSymbol = [
            "fa-diamond",
            "fa-diamond", 
            "fa-paper-plane-o",
            "fa-paper-plane-o",  
            "fa-anchor",
            "fa-anchor",
            "fa-bomb",
            "fa-bomb", 
            "fa-cube",
            "fa-cube",   
            "fa-anchor",
            "fa-anchor", 
            "fa-leaf",
            "fa-leaf",   
            "fa-bicycle",
            "fa-bicycle"];
    var randomList = [];
    var currentCard = [];
    var cardState = [];
    randomList = shuffle(cardSymbol); //creates a list of random card symbol classes
    for (let i = 1; i < 17; i++){  //assigns classes randomly to the html element in DOM
        cardState[i] = document.getElementById(i); //Parent Card. Shows the state of the card.
        cardState[i].addEventListener('click', cardClicked);
                 
        currentCard[i] = document.getElementById(i).firstElementChild; //Child element. Displays symbol.
        currentCard[i].classList.add(randomList.pop());
        currentCard[i].classList.add("fa"); //assigns the same class to all the cards in the deck

        }; 
    //Starts the timer 
    timer();
    
} 

//Handles the numbers of clicks allowed per play.
function cardClicked () {
            //It resets the click count after the second click.
            if (clickCount >= 2){
                    clickCount = 0
                    return}
            else { 
                clickCount = clickCount + 1;
                this.classList.add("show");
                this.classList.add("open");
                selectedCard = this.firstElementChild.classList;
                selectedParentCard = this.classList;
                //The selected cards are put in a temporary variable.
                openCards.push(this);
                console.log(openCards.length);
                if (openCards.length == 2) { //checks if the card has reached the maximum number of clicks per play and if true, calls pairCards to check for winning/losing conditions
                    pairCards();  
                }                 
            }
}

//Checks for winning/losing conditions
function pairCards () {
    
    if (openCards[0].firstElementChild.classList.value ===                                          openCards[1].firstElementChild.classList.value) { //if both open cards have the same class executes the code for matching cards. It also resets the open cards variable and calls "checkForWin" function
        console.log("ITS A MATCH!");  
        document.getElementsByClassName("moves")[0].innerText = remainingMoves;
        openCards[0].removeEventListener('click', cardClicked);
        openCards[1].removeEventListener('click', cardClicked);
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        successfulMatches = successfulMatches + 1;
        clickCount = 0;
        openCards = [];
        checkForWin();
    }
    
    else {  //if the open cards do not match it calls resetOpencards
        setTimeout(resetOpenCards, 1000);    
    }
}

//It resets the open cards variables as well as the click count. It also decreases the 'moves' counter by 1 and removes a star. If player doesn't have remaining moves it calls endGame to end the game.
function resetOpenCards (){
      //resets the selected cards and the openCards variables. 
                    openCards[0].classList.toggle("show");
                    openCards[0].classList.toggle("open");
                    openCards[1].classList.toggle("show");
                    openCards[1].classList.toggle("open");
                    openCards = [];
                    clickCount = 0
                    remainingMoves = remainingMoves - 1;
                    document.getElementsByClassName("moves")[0].innerText = remainingMoves;
                    attempts[0].children[remainingMoves].children[0].classList.remove("fa-star");
                    if (remainingMoves == 0) {endGame()};
}

//Checks if the winning condition has been reached and displays a 'congratulations' message. If false, it does nothing and the game continues.
function checkForWin () {
            let cardState = [];
            if (successfulMatches == 8){
                document.getElementById("displayText").innerHTML = "Congratulations! You've won!. Click on the restart button to start a new game";
                removeListeners();
                won=true;
                
            }
            else {return}

}

//Displays a message if the losing condition is triggered and prevents any card moves by removing all the event listeners for the cards.
function endGame () {
                removeListeners();
                document.getElementById("displayText").innerHTML = "You've ran out of moves! Click on the restart button to start a new game";
                lost=true;
                
                
                
} 
    
//Resets all global veriables to their initial values
function restartGame () {

            selectedCard = undefined;
            selectedParentCard = undefined;
            clicked = false;
            openCards = [];
            remainingMoves = 3;
            clickCount = 0;
            attempts = document.getElementsByClassName("stars");
            attempts[0].children[0].children[0].classList.add("fa-star");    
            attempts[0].children[1].children[0].classList.add("fa-star");
            attempts[0].children[2].children[0].classList.add("fa-star");
            successfulMatches = 0;
            document.getElementById("displayText").innerHTML = "";
            document.getElementsByClassName("moves")[0].innerText = remainingMoves; 
            reset = true;
            banner.style.display = "none";
            resetGrid();            
            startGame();
            timer();
}

//Removes all event listeners from cards at once.
function removeListeners (){
            let cardState = [];   
            for (let i = 1; i < 17; i++){
                cardState[i] = document.getElementById(i);       
                cardState[i].removeEventListener('click', cardClicked);
                } 
}

//It resets the grid to its initial state.
function resetGrid (){
            let cardState = [];   
            for (let i = 1; i < 17; i++){
                cardState[i] = document.getElementById(i);
                cardState[i].classList.remove("show");
                cardState[i].classList.remove("open");
                cardState[i].classList.remove("match");
                cardState[i].firstElementChild.className = "";
                } 
}

//Adds functionallity to the 'Restart' button.
function restartButton (){
        let resetButton = document.getElementsByClassName("restart");
        resetButton[0].addEventListener('click', restartGame);
        startGame();
        
    
}

//Reorders a list in a randomly fashion.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//It adds a timer to the game
function timer(){
    let minuteCount = 00;
    let secondCount = 00;
    let time = setInterval(function(){ 
        //these get the span html elements where the timer is updated.
        document.getElementById("timerSeconds").innerHTML = secondCount;
        document.getElementById("timerMinutes").innerHTML = minuteCount;
        //This counter adds 1 to the secondCount variable each second.
        secondCount++;
        
        //if the second count reaches 59 it adds 1 to the minute counter and resets the seconds counter back to 0.
        if (secondCount === 59) {
            minuteCount++;
            secondCount=0;            
        }        
        
        //if the variable won is true, it stops the timer and modifies the totalTime variable and adds a message for the player with the total time it took them to finish the game by calling theshowTotalTime function. Next, it resets the won variable back for the next game.
        if (won){
            clearTimeout(time);
            console.log("clear timeout successful");
            totalTime = "You've won! It took you " + minuteCount + " minutes and " + (secondCount - 1) + " seconds to finish this game!";
            showTotalTime();
            won = false;
            
        }
        
        //Same fuctionallity as the IF statement above but for the losing condition.
        if (lost){
            clearTimeout(time);
            totalTime = "You've lost! It took you " + minuteCount + " minutes and " + (secondCount - 1) + " seconds to finish this game!";    
            showTotalTime();
            lost = false;

        }
        
        //If the Restart button is clicked, it stops the timer and resets the all timer variables to get them ready for the next game.
        if (reset){
            clearTimeout(time);
            minuteCount = 00;
            secondCount = 00;
            totalTime = "";
            reset = false;
 
        }
    }, 1000);
 
}

//Adds a modal to the screen showing the total amount of time that took the player to finish the current game.
function showTotalTime(){
    banner.style.display = "block";
    bannerText.textContent = totalTime;
}


//restartButton fuction initialization 
restartButton();
