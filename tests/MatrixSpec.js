import { expect } from 'chai'
import Matrix from '../src/Matrix'

describe('Matrix', () => {

    it('makes a zero matrix with given rows and columns', function() {
        expect(Matrix.create(2, 3)).to.eql([
            [0, 0, 0],
            [0, 0, 0],
        ])
    })

    it('can loop through all the rows and columns', () => {
        const matrix = Matrix.create(4,2)

    })
})