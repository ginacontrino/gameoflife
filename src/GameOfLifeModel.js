import { create, nextGenerationMatrix } from './MatrixHelpers'

let matrix = []

export default {
    init(rows, columns, randomize) {
        matrix = create(rows, columns, randomize)
    },

    getMatrix() {
        return matrix
    },

    getNextGeneration(matrixAsArgument) {
        matrix = nextGenerationMatrix(arguments.length ? matrixAsArgument : matrix)

        return matrix
    },
}