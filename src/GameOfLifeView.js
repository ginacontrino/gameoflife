export default {
    init(matrix){
        for(let row = 0; row < matrix.length; row++) {
            const rowElement = document.createElement('div')
            document.querySelector('.GameOfLife-canvas').appendChild(rowElement)

            for(let column = 0; column < matrix[row].length; column++) {
                const cellElement = document.createElement('div')
                cellElement.className = 'GameOfLife-cell'
                cellElement.classList.add('GameOfLife-cell-' + row + '-' + column)

                if( matrix[row][column] ) cellElement.classList.add('is-active')

                rowElement.appendChild(cellElement)
            }
        }
    },

    update(matrix) {
        document.querySelector('.GameOfLife').classList.add('has-started')

        for(let x = 0; x < matrix.length; x++) {
            for(let y = 0; y < matrix[x].length; y++) {
                const currentDiv = document.querySelector('.GameOfLife-cell-' + x + '-' + y)

                const classList = currentDiv.classList
                matrix[x][y] ? classList.add('is-active') : classList.remove('is-active')
            }
        }
    },
}