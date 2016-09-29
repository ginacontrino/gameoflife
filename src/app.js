import GameOfLifeModel from './GameOfLifeModel';
import GameOfLifeView from './GameOfLifeView';

const gameOfLifeElement = document.querySelector('.GameOfLife')
const rows = gameOfLifeElement.getAttribute('rows')
const columns = gameOfLifeElement.getAttribute('columns')

// Initialize the game to a random 30x30 matrix
GameOfLifeModel.init(rows, columns, true)

// Draw the initial game matrix in the browser
GameOfLifeView.init(GameOfLifeModel.getMatrix())

// When the start button is clicked, play the game every 200 milliseconds
document.querySelector('.GameOfLife-startButton').addEventListener('click', () => setInterval(() => {
    GameOfLifeView.update(GameOfLifeModel.getNextGeneration())
}, 200))