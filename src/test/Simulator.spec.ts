import { DIRECTION, Simulator } from '../Simulator';

/**
 *       a)
 *           PLACE 0,0,NORTH
 *           MOVE
 *           REPORT
 *           Output: 0,1,NORTH
 *
 *       b)
 *           PLACE 0,0,NORTH
 *           LEFT
 *           REPORT
 *           Output: : 0,0,WEST
 *
 */

describe('Test cases as provided in Challenge Document', () => {
    it("Test case 'a'", () => {
        const sim = new Simulator({ F: DIRECTION.NORTH, X: 0, Y: 0 });
        sim.move();
        const output = sim.report();

        expect(output.F).toEqual(DIRECTION.NORTH);
        expect(output.X).toEqual(0);
        expect(output.Y).toEqual(1);
    });

    it("Test case 'b'", () => {
        const sim = new Simulator({ F: DIRECTION.NORTH, X: 0, Y: 0 });
        sim.changeDirection('LEFT');
        const output = sim.report();

        expect(output.F).toEqual(DIRECTION.WEST);
        expect(output.X).toEqual(0);
        expect(output.Y).toEqual(0);
    });
});

describe('Additional full length test cases', () => {
    it('Test case implementing all methods', () => {
        const sim = new Simulator({ F: DIRECTION.SOUTH, X: 0, Y: 0 });
        sim.changeDirection('LEFT');
        sim.move();
        sim.changeDirection('LEFT');
        sim.move();
        sim.move();
        sim.changeDirection('RIGHT');
        const output = sim.report();

        expect(output.F).toEqual(DIRECTION.EAST);
        expect(output.X).toEqual(1);
        expect(output.Y).toEqual(2);
    });

    it("Test case 'b'", () => {
        /**
         *
         */
        const sim = new Simulator({ F: DIRECTION.NORTH, X: 0, Y: 0 });
        sim.changeDirection('LEFT');
        const output = sim.report();

        expect(output.F).toEqual(DIRECTION.WEST);
        expect(output.X).toEqual(0);
        expect(output.Y).toEqual(0);
    });
});

describe('Test cases that ignore steps', () => {
    it('Test case implementing all methods', () => {
        const sim = new Simulator({ F: DIRECTION.SOUTH, X: 0, Y: 0 });
        sim.move();
        sim.move();
        sim.move();
        const output = sim.report();

        expect(output.F).toEqual(DIRECTION.SOUTH);
        expect(output.X).toEqual(0);
        expect(output.Y).toEqual(0);
    });
});

describe('Invalid PLACE commands', () => {
    it('Test invalid X coordinate', () => {
        expect(() => {
            new Simulator({ F: DIRECTION.SOUTH, X: 6, Y: 0 });
        }).toThrow('Invalid X coordinate. Value must be from 0 to 4');
    });

    it('Test invalid Y coordinate', () => {
        expect(() => {
            new Simulator({ F: DIRECTION.SOUTH, X: 0, Y: -1 });
        }).toThrow('Invalid Y coordinate. Value must be from 0 to 4');
    });
});
