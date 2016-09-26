import { create, nextGenerationMatrix } from './MatrixHelpers'

let matrix = []

export default {
    init(rows, columns) {
        matrix = create(rows, columns, true)
    },

    getMatrix() {
        return matrix
    },

    getNextGeneration() {
        matrix = nextGenerationMatrix(matrix)

        return matrix
    },
}