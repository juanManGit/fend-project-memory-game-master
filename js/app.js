
//Global Variables
var selectedCard = undefined;
var selectedParentCard = undefined;
var clicked = false;
var openCards = [];
var remainingMoves = 3;
var clickCount = 0;
var attempts = document.getElementsByClassName("stars");
var successfulMatches = 0;

//Main function. It starts the game
function startGame () {
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
} 

//Handles the numbers of clicks allowed per play.
function cardClicked () {
            
            if (clickCount >= 2){
                    clickCount = 0
                    return}
            else { 
                clickCount = clickCount + 1;
                this.classList.add("show");
                this.classList.add("open");
                selectedCard = this.firstElementChild.classList;
                selectedParentCard = this.classList;
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
            }
            else {return;}

}

//Displays a message if the losing condition is triggered and prevents any card moves by removing all the event listeners for the cards.
function endGame () {
                removeListeners();
                document.getElementById("displayText").innerHTML = "You've ran out of moves! Click on the restart button to start a new game";
                
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
            resetGrid();
            startGame();
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


//restartButton fuction initialization 
restartButton();
