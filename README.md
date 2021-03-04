# 9 Lives

## HTML for '9 Lives' game

Including the following:

The overall design: there is a main page that shows a cat picture and has 4-buttons for the user to guess the cat breed. Then, at the top of the page it displays the number of lives you have remaining. 

When the user clicks a correct answer a modal-dialog pops up with information about the cat breed, and a button to continue to the next question. When the user runs out of lives the box pops up displaying the user score and a button to start the game over again.

---
## CSS for '9 Lives' game
Including the following:

Used a flex-box for the top and a grid-layout for the buttons to guess a cat breed. The modal-dialog uses a fixed-position to appear on top of the main page. Also, used media queries to size the images and content appropriately for mobile devices.

---
## Using JavaScript

First, it loads the list of cat breeds using 'the Cat API'. Then, it picks four random breeds and loads a picture and information about the correct one that is displayed when it is selected. When the user clicks a button to make a guess the event handler checks whether the guess was correct. If the guess is wrong you lose one of your nine lives. If the guess is correct it pops up the dialog to show breed information. Once the lives are depleted a popup appears with the score of correct guesses. After every step render() is called to use jQuery to update the page to reflect the input.

---