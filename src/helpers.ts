import { Simulator, Place, DIRECTION } from './Simulator';

export const executeCommand = (command: string, sim: Simulator) => {
    try {
        switch (command) {
            case 'LEFT':
                sim.changeDirection('LEFT');
                break;
            case 'RIGHT':
                sim.changeDirection('RIGHT');
                break;
            case 'MOVE':
                sim.move();
                break;
            case 'REPORT':
                const result = sim.report();
                console.log(JSON.stringify(result, null, 2));
                break;
            case command.match(/^PLACE/)?.input:
                const place = returnFormattedPlace(command);
                sim.updatePlace(place);
                break;
            default:
                console.error(`Invalid command '${command}'`);
                break;
        }
    } catch (error) {
        throw error;
    }
};

export const returnFormattedPlace = (command: string): Place => {
    const [X, Y, F] = command.substring(6).split(',');
    return { X: Number(X), Y: Number(Y), F: F as unknown as DIRECTION };
};
