const db = require('../fixtures/memory-db.js');
const { turnLeft, turnRight, moveForward, moveBackward, doCommand } = require('../core/roverActions.js');


describe('roverActions', () => {
    let updateRoverSpy;
    beforeAll(() => {
        updateRoverSpy = jest.spyOn(db, 'updateRover');
    });

    describe('turnLeft', () => {
        it('should turn left correctly from any other direction', () => {
            turnLeft({ roverId: 1, rover: { x: 1, y: 2, direction: 'North' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'West' });

            turnLeft({ roverId: 1, rover: { x: 1, y: 2, direction: 'South' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'East' });

            turnLeft({ roverId: 1, rover: { x: 1, y: 2, direction: 'East' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'North' });

            turnLeft({ roverId: 1, rover: { x: 1, y: 2, direction: 'West' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'South' });
        });

        it('should return updated rover value', () => {
            updateRoverSpy.mockReturnValueOnce('test-value-returned');
            const result = turnLeft({ roverId: 1, rover: { x: 1, y: 2, direction: 'North' } });
            expect(result).toEqual('test-value-returned');
        });
    });

    describe('turnRight', () => {
        it('should turn right correctly form any other direction', () => {
            turnRight({ roverId: 1, rover: { x: 1, y: 2, direction: 'North' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'East' });

            turnRight({ roverId: 1, rover: { x: 1, y: 2, direction: 'South' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'West' });

            turnRight({ roverId: 1, rover: { x: 1, y: 2, direction: 'East' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'South' });

            turnRight({ roverId: 1, rover: { x: 1, y: 2, direction: 'West' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 2, direction: 'North' });
        });

        it('should return updated rover value', () => {
            updateRoverSpy.mockReturnValueOnce('test-value-returned');
            const result = turnRight({ roverId: 1, rover: { x: 1, y: 2, direction: 'North' } });
            expect(result).toEqual('test-value-returned');
        });
    });

    describe('moveForward', () => {
        it('should moveForward according to current direction', () => {
            moveForward({ roverId: 1, rover: { x: 0, y: 0, direction: 'North' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 0, y: 1, direction: 'North' });

            moveForward({ roverId: 1, rover: { x: 0, y: 0, direction: 'East' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 0, direction: 'East' });

            moveForward({ roverId: 1, rover: { x: 0, y: 0, direction: 'South' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 0, y: -1, direction: 'South' });

            moveForward({ roverId: 1, rover: { x: 0, y: 0, direction: 'West' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: -1, y: 0, direction: 'West' });
        });

        it('should return updated rover value', () => {
            updateRoverSpy.mockReturnValueOnce('test-value-returned');
            const result = moveForward({ roverId: 1, rover: { x: 0, y: 0, direction: 'North' } });
            expect(result).toEqual('test-value-returned');
        });
    });

    describe('moveBackward', () => {
        it('should moveBackward according to current direction', () => {
            moveBackward({ roverId: 1, rover: { x: 0, y: 0, direction: 'North' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 0, y: -1, direction: 'North' });

            moveBackward({ roverId: 1, rover: { x: 0, y: 0, direction: 'East' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: -1, y: 0, direction: 'East' });

            moveBackward({ roverId: 1, rover: { x: 0, y: 0, direction: 'South' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 0, y: 1, direction: 'South' });

            moveBackward({ roverId: 1, rover: { x: 0, y: 0, direction: 'West' } });
            expect(updateRoverSpy).toBeCalledWith({ roverId: 1, x: 1, y: 0, direction: 'West' });
        });

        it('should return updated rover value', () => {
            updateRoverSpy.mockReturnValueOnce('test-value-returned');
            const result = moveBackward({ roverId: 1, rover: { x: 0, y: 0, direction: 'North' } });
            expect(result).toEqual('test-value-returned');
        });
    });


    describe('doCommand', () => {

        it('should go right successfully', () => {
            const result = doCommand({ command: 'R', roverId: 'test', rover: { x: 1, y: 1, direction: 'North' } });
            expect(result).toEqual({
                x: 1,
                y: 1,
                direction: "East",
            });
        });

        it('should go left  successfully', () => {
            const result = doCommand({ command: 'L', roverId: 'test', rover: { x: 1, y: 1, direction: 'North' } });
            expect(result).toEqual({
                x: 1,
                y: 1,
                direction: "West",
            });
        });

        it('should go move forward successfully', () => {
            const result = doCommand({ command: 'F', roverId: 'test', rover: { x: 1, y: 1, direction: 'North' } });
            expect(result).toEqual({
                x: 1,
                y: 2,
                direction: "North",
            });
        });

        it('should go move backward successfully', () => {
            const result = doCommand({ command: 'B', roverId: 'test', rover: { x: 1, y: 1, direction: 'North' } });
            expect(result).toEqual({
                x: 1,
                y: 0,
                direction: "North",
            });
        });

    });

});