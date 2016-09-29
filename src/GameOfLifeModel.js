import { create, nextGenerationMatrix } from './MatrixHelpers'

let matrix = []

export default {
    init(rows, columns, randomize) {
        matrix = create(rows, columns, randomize)
    },

    getMatrix() {
        return matrix
    },

    getNextGeneration() {
        matrix = nextGenerationMatrix(matrix)

        return matrix
    },
}