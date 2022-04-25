export type Place = {
    X: number;
    Y: number;
    F: DIRECTION;
};

export enum DIRECTION {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST'
}

/**
 * Board layout
 *                       NORTH
 *          /-----|-----|-----|-----|-----\
 *          | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 |
 *          |-----|-----|-----|-----|-----|
 *          | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
 *    WEST  |-----|-----|-----|-----|-----| EAST
 *          | 0,2 | 1,2 | 2,2 | 3,2 | 4,2 |
 *          |-----|-----|-----|-----|-----|
 *          | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
 *          |-----|-----|-----|-----|-----|
 *          | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
 *          \-----|-----|-----|-----|-----/
 *                       SOUTH
 */

export class Simulator {
    place: Place;

    constructor(place: Place) {
        try {
            // First validate that the placement is possible (throw error if not)
            this.validatePlaceCommand(place);
            this.place = place;
        } catch (error) {
            throw error;
        }
    }

    // Feels unnecessary (could just reference the class property directly above, but wanted to implement method for readability)
    report = (): Place => {
        return this.place;
    };

    // Move the robot 1 unit in direction it is pointing
    move = () => {
        if (this.isSafeMove) {
            switch (this.place.F) {
                case DIRECTION.EAST:
                    this.place.X = this.place.X + 1;
                    break;
                case DIRECTION.WEST:
                    this.place.X = this.place.X - 1;
                    break;
                case DIRECTION.NORTH:
                    this.place.Y = this.place.Y + 1;
                    break;
                case DIRECTION.SOUTH:
                    this.place.Y = this.place.Y - 1;
                    break;
            }
        } else {
            return false; //Not safe to move, do nothing
        }
    };

    // Change direction 90 degrees left or right.
    changeDirection = (direction: 'RIGHT' | 'LEFT') => {
        switch (this.place.F) {
            case DIRECTION.EAST:
                this.place.F = direction === 'RIGHT' ? DIRECTION.SOUTH : DIRECTION.NORTH;
                break;
            case DIRECTION.WEST:
                this.place.F = direction === 'RIGHT' ? DIRECTION.NORTH : DIRECTION.SOUTH;
                break;
            case DIRECTION.NORTH:
                this.place.F = direction === 'RIGHT' ? DIRECTION.EAST : DIRECTION.WEST;
                break;
            case DIRECTION.SOUTH:
                this.place.F = direction === 'RIGHT' ? DIRECTION.WEST : DIRECTION.EAST;
                break;
        }
    };

    // isSafeMove - Getter - Check if another move in current direction would result in 'destruction'
    // if 'true' = safe to move forward
    private get isSafeMove(): boolean {
        switch (this.place.F) {
            case DIRECTION.EAST:
                return this.place.X !== 4;
            case DIRECTION.WEST:
                return this.place.X !== 0;
            case DIRECTION.NORTH:
                return this.place.Y !== 4;
            case DIRECTION.SOUTH:
                return this.place.Y !== 0;
        }
    }

    // Update place
    updatePlace = (place: Place) => {
        this.validatePlaceCommand(place);
        this.place = place;
    };

    // Validate the coordinates / direction provided for the PLACE command.
    private validatePlaceCommand(place: Place) {
        const { X, Y, F } = place;

        if (!Object.keys(DIRECTION).includes(F)) {
            throw new Error(`Invalid direction ${F}`);
        }

        if (X < 0 || X > 4) {
            throw new Error('Invalid X coordinate. Value must be from 0 to 4');
        }

        if (Y < 0 || Y > 4) {
            throw new Error('Invalid Y coordinate. Value must be from 0 to 4');
        }
    }
}
