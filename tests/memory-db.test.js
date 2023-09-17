jest.mock('uuid');
const { v4: uuid } = require('uuid');
const { createRover, db, getRoverById, updateRover } = require("../fixtures/memory-db");

describe('memory-db', () => {
    beforeAll(() => {
        uuid.mockReturnValue('db-id');
    });

    afterEach(() => {
        db.rover = new Map();
    });

    it('should create rover in db', () => {
        const result = createRover({ x: 1, y: 2, direction: 'North' });
        expect(result).toEqual({ id: 'db-id', x: 1, y: 2, direction: 'North' });
        expect(db.rover).toEqual(new Map([
            ['db-id', { x: 1, y: 2, direction: 'North' }]
        ]));
    });

    it('should get rover by id', () => {
        const rover = createRover({ x: 1, y: 2, direction: 'North' });
        const result = getRoverById(rover.id);
        expect(result).toEqual({ id: 'db-id', x: 1, y: 2, direction: 'North' });
    });

    it('should update rover', () => {
        const rover = createRover({ x: 1, y: 2, direction: 'North' });
        const result = updateRover({ roverId: rover.id, direction: 'East', x: 0, y: 0 });
        expect(result).toEqual({ x: 0, y: 0, direction: 'East' });
        expect(db.rover).toEqual(new Map([
            ['db-id', { x: 0, y: 0, direction: 'East' }]
        ]));
    });

});