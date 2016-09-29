// implementation of real mod operator
const mod = (n, m) => ((n % m) + m) % m

// creates a new matrix, optionally randomizes cell values to 0 or 1
export const create = function(rows, columns, randomize = false) {
    const matrix = []

    for(let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = []

        for(let columnIndex = 0; columnIndex < columns; columnIndex++) {
            row[columnIndex] = randomize ? Math.round(Math.random()) : 0
        }

        matrix[rowIndex] = row
    }

    return matrix
}

// calculate the next generation of a matrix according to game of life rules
export const nextGenerationMatrix = function(matrix) {
    const nextGeneration = create(matrix.length, matrix[0].length)

    for(let row = 0; row < matrix.length; row++) {
        for(let column = 0; column < matrix[row].length; column++) {
            nextGeneration[row][column] = nextGenerationCell(row, column, matrix)
        }
    }

    return nextGeneration
}

// calculate the next generation of a single cell according to game of life rules
export const nextGenerationCell = function(row, column, matrix) {
    const activeNeighbours = getCellNeighbours(row, column, matrix).filter(a => a).length

    if( matrix[row][column] && activeNeighbours < 2 ) return 0

    if( matrix[row][column] && activeNeighbours > 3 ) return 0

    if( ! matrix[row][column] && activeNeighbours === 3 ) return 1

    return matrix[row][column]
}

// get all the neighbour cells of a given cell assuming "infinite" grid
function getCellNeighbours(x, y, matrix) {
    // to get the number of columns, just get length of the first row
    const numberOfColumns = matrix[0].length
    const numberRows = matrix.length

    const leftColumn = mod((y - 1), numberOfColumns)
    const rightColumn = mod((y + 1), numberOfColumns)
    const topRow = mod((x - 1), numberRows)
    const bottomRow = mod((x + 1), numberRows)

    const left = matrix[x][leftColumn]
    const topleft = matrix[topRow][leftColumn]
    const top = matrix[topRow][y]
    const topright = matrix[topRow][rightColumn]
    const right = matrix[x][rightColumn]
    const bottomright = matrix[bottomRow][rightColumn]
    const bottom = matrix[bottomRow][y]
    const bottomleft = matrix[bottomRow][leftColumn]

    return [left, topleft, top, topright, right, bottomright, bottom, bottomleft]
}