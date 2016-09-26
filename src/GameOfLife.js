import Grid from './Grid';
import {mod} from './MathUtils'

export default {

    getNextGeneration(grid) {
        const nextGenerationGrid = Grid.makeZeroMatrix(grid.length, grid[0].length)

        for(let x = 0; x < grid.length; x ++) {
            for(let y = 0; y < grid[x].length; y ++) {
                nextGenerationGrid[x][y] = this.getNextCellState(x, y, grid)
            }
        }

        return nextGenerationGrid
    },

    getNextCellState(x, y, grid) {
        const cellState = grid[x][y]
        const activeNeighbours = this.getNeighbours(x, y, grid).filter(a => a).length

        if( cellState && activeNeighbours < 2 ) return 0

        if( cellState && activeNeighbours > 3 ) return 0

        if( ! cellState && activeNeighbours === 3 ) return 1

        else return cellState
    },

    getNeighbours: function(x, y, grid) {
        // to get the number of columns, just get length of the first row
        const numberOfColumns = grid[0].length
        const numberRows = grid.length

        const leftColumn = mod((y - 1), numberOfColumns)
        const rightColumn = mod((y + 1), numberOfColumns)
        const topRow = mod((x - 1), numberRows)
        const bottomRow = mod((x + 1), numberRows)


        const left = grid[x][leftColumn]
        const topleft = grid[topRow][leftColumn]
        const top = grid[topRow][y]
        const topright = grid[topRow][rightColumn]
        const right = grid[x][rightColumn]
        const bottomright = grid[bottomRow][rightColumn]
        const bottom = grid[bottomRow][y]
        const bottomleft = grid[bottomRow][leftColumn]

        return [left, topleft, top, topright, right, bottomright, bottom, bottomleft]
    },
}