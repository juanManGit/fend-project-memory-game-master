# fend-project-memory-game-master by Juan Moreno

# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#Dependencies)

## Instructions

This game consists of 3 main local files plus some prefetched files provided by Udacity. 

index.html: It contains the html for the game.

app.js: It contains the Javascript code and all of the game functionallity. 

app.css: It contains some CSS classes used in the game.


In order to run the game, the index.html file must be opened. 

### How to play

The game consists of a 4x4 grid for a total of 16 cards. When a card is clicked the card is saved to a temporary variable (openCards). If two cards match, the game removes the event listeners from these cards and left the cards Open. It they do not match, the total attempts count will decrease by 1. The player has a total of 3 attempts to win the game.

## Dependencies

#startGame():
Main fuction. It sets an array of random cards and adds them to the DOM.

#cardClicked():
Handles the numbers of clicks allowed per play.

#pairCards(): 
Checks for winning/losing conditions.

#resetOpenCards():
It resets the open cards variables as well as the click count. It also decreases the 'moves' counter by 1 and removes a star. If player doesn't have remaining moves it calls endGame to end the game.

#checkForWin():
Checks if the winning condition has been reached and displays a 'congratulations' message. If false, it does nothing and the game continues.

#endGame():
Displays a message if the losing condition is triggered and prevents any card moves by removing all the event listeners for the cards.

#restartGame():
Resets all global veriables to their initial values

#removeListeners():
It removes all event listeners from all the cards at once.

#resetGrid ():
It resets the grid to its initial state.

#restartButton():
Adds functionallity to the 'Restart' button.

#shuffle():
Reorders a list in a randomly fashion.


## License

None.

Assets provided by Udacity 



