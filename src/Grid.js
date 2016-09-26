export default {

    make: function(height, width) {
        const matrix = [];

        for(let i = 0; i < height; i++) {
            matrix[i] = []
            for (let j = 0; j < width; j++) {
                matrix[i][j] = Math.round(Math.random())
            }
        }

        return matrix
    },

    makeZeroMatrix (rows, columns) {
        const matrix = []
        for(let x = 0; x < rows; x++) {
            let a = []
            for(let y = 0; y < columns; y++) {
                a[y] = 0
            }
            matrix[x] = a
        }
        return matrix
    },
}