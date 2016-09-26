import GameOfLife from './GameOfLife';
import Grid from './Grid';

const context = document.getElementById("context")
const button = document.getElementById("button")

let matrix = []

button.addEventListener('click', () => {
    init()
    setInterval(() => updateAndDraw(matrix), 200)
    context.style.display = 'block'
    button.style.display = 'none'
})

function init() {
    matrix = Grid.make(24, 24)

    for(let x = 0; x < matrix.length; x ++) {
        let row = document.createElement("div")
        row.className = "row"
        row.classList.add('row-' + x)

        context.appendChild(row)

        for(let y = 0; y < matrix[x].length; ++ y) {
            let cell = document.createElement("div")

            cell.className = 'cell'
            cell.classList.add(matrix[x][y] ? 'active' : 'inactive')
            cell.classList.add('cell-' + x + '-' + y)

            row.appendChild(cell)
        }
    }
}

function updateAndDraw(grid) {

    let newGrid = GameOfLife.getNextGeneration(grid)
    matrix = newGrid

    for(let x = 0; x < newGrid.length; x ++) {
        for(let y = 0; y < newGrid[x].length; y ++) {
            let currentDiv = document.getElementsByClassName('cell-' + x + '-' + y)

            let classList = currentDiv[0].classList
            classList.contains('active') ? classList.remove('active') : classList.remove('inactive')
            classList.add(newGrid[x][y] ? 'active' : 'inactive')
        }
    }
}