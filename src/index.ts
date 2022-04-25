import { Simulator } from './Simulator';
import { readFileSync } from 'fs';
import { executeCommand, returnFormattedPlace } from './helpers';

try {
    // Read file
    const data = readFileSync('input_commands.txt', 'utf-8');

    // Split into array
    const lines = data.split(/\r?\n/);

    let sim: Simulator | undefined;
    // Execute commands
    lines.forEach((line) => {
        // If we have a simulator running already...
        if (sim) {
            executeCommand(line, sim);
        } else {
            // Ignore all other commands until PLACE has been set.
            if (line.match(/^PLACE/)) {
                const place = returnFormattedPlace(line);
                sim = new Simulator(place);
            }
        }
    });
} catch (error) {
    console.error(error);
}
