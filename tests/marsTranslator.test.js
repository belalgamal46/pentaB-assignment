const { executeCommand } = require("../core/marsTranslator");
const { createRover } = require("../fixtures/memory-db");

describe('marsTranslator', () => {

    describe('executeCommand', () => {
        it('should execute command FLFFFRFLB', () => {
            const rover = createRover({ x: 0, y: 0, direction: 'North' });
            const result = executeCommand({ command: 'FLFFFRFLB', rover: rover });
            expect(result).toEqual({ direction: 'West', x: -2, y: 2 });
        });

        it('should execute command FFBBF', () => {
            const rover = createRover({ x: 0, y: 0, direction: 'North' });
            const result = executeCommand({ command: 'FFBBF', rover: rover });
            expect(result).toEqual({ direction: 'North', x: 0, y: 1 });
        });
    });
});