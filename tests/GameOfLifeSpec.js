import { expect } from 'chai'
import { create, nextGenerationCell, nextGenerationMatrix } from '../src/MatrixHelpers'


describe('Game Of Life Module', () => {

    describe('Matrix', () => {

        it('it can be initialised with rows and columns', () => {

            expect(create(3,3)).to.eql([
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ])

        })

    })

    describe('Cell', () => {

        describe('Starts Alive', () => {
            it('dies if it is has less than 2 alive neighbours', () => {

                const oneNeighboursAndActive = [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 1, 0],
                ]

                const noNeighboursAndActive = [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0],
                ]

                expect(nextGenerationCell(1, 1, oneNeighboursAndActive)).to.equal(0)
                expect(nextGenerationCell(1, 1, noNeighboursAndActive)).to.equal(0)
            })

            it('stays alive if it has 2 alive neighbours', () => {

                const twoNeighboursAndActive = [
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 0],
                ]

                expect(nextGenerationCell(1, 1, twoNeighboursAndActive)).to.equal(1)
            })

            it('stays alive if it has 3 alive neighbours', () => {
                const threeNeighboursAndActive = [
                    [0, 0, 1],
                    [1, 1, 0],
                    [0, 1, 0],
                ]

                expect(nextGenerationCell(1, 1, threeNeighboursAndActive)).to.equal(1)
            })

            it('dies if it is has less more than 3 alive neighbours', () => {

                const fourNeighboursAndActive = [
                    [0, 0, 0],
                    [1, 1, 0],
                    [1, 1, 1],
                ]

                const fiveNeighboursAndActive = [
                    [0, 0, 1],
                    [1, 1, 0],
                    [1, 1, 1],
                ]

                expect(nextGenerationCell(1, 1, fourNeighboursAndActive)).to.equal(0)
                expect(nextGenerationCell(1, 1, fiveNeighboursAndActive)).to.equal(0)
            })
        })

        describe('Starts Dead', () => {
            it('comes to life if it has exactly 3 alive neighbours', () => {

                const deadAnd3Neighbours = [
                    [0, 1, 0],
                    [0, 0, 1],
                    [0, 1, 0],
                ]

                expect(nextGenerationCell(1, 1, deadAnd3Neighbours)).to.equal(1)
            })

            it('stays dead if it does not have exactly 3 alive neighbours', () => {

                const deadAnd4Neighbours = [
                    [1, 1, 0],
                    [0, 0, 1],
                    [0, 1, 0],
                ]

                const deadAnd2Neighbours = [
                    [1, 1, 0],
                    [0, 0, 1],
                    [0, 1, 0],
                ]

                expect(nextGenerationCell(1, 1, deadAnd4Neighbours)).to.equal(0)
                expect(nextGenerationCell(1, 1, deadAnd2Neighbours)).to.equal(0)
            })
        })
    })

    describe('Grid', () => {

        describe('Still Lifes', () => {

            it('is stable for the block', () => {
                const block = [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                ]

                expect(nextGenerationMatrix(block)).to.eql(block)

            })

            it('is stable for the beehive', () => {
                const beehive = [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 1, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ]

                expect(nextGenerationMatrix(beehive)).to.eql(beehive)
            })

            it('is stable for the loaf', () => {
                const loaf = [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 1, 0],
                    [0, 1, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ]

                expect(nextGenerationMatrix(loaf)).to.eql(loaf)
            })
        })

        describe('Period 2 Oscillators', () => {

            it('works for blinkers', () => {
                const gen1 = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ]

                const gen2 = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]

                expect(nextGenerationMatrix(gen1)).to.deep.equal(gen2)
                expect(nextGenerationMatrix(gen2)).to.deep.equal(gen1)
            })
        })

        describe('Dieing games', () => {

            it('dies for 3 diagonals', () => {
                const gen1 = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]

                const gen2 = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]

                const gen3 = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]

                expect(nextGenerationMatrix(gen1)).to.deep.equal(gen2)
                expect(nextGenerationMatrix(gen2)).to.deep.equal(gen3)
            })
        })

        describe('Stabilizing games', () => {

            it('stabilizes for test pattern', () => {
                const gen1 = [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]

                const gen5 = [
                    [0, 0, 1, 1, 0, 0],
                    [0, 1, 0, 0, 1, 0],
                    [0, 1, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]

                const gen2 = nextGenerationMatrix(gen1)
                const gen3 = nextGenerationMatrix(gen2)
                const gen4 = nextGenerationMatrix(gen3)
                expect(nextGenerationMatrix(gen4)).to.deep.equal(gen5)
            })
        })
    })
})