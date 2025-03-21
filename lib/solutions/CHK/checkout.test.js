const checkout = require('./checkout');

describe('Checkout function', () => {

    it('should return 130 for 3 A\'s (special offer)', () => {
        expect(checkout('AAA')).toBe(130);
    });

    it('should return 45 for 2 B\'s (special offer)', () => {
        expect(checkout('BB')).toBe(45);
    });

    it('should return 160 for 1 A, 3 B\'s, and 1 C', () => {
        expect(checkout('ABBBC')).toBe(160);
    });

    it('should return -1 for invalid item', () => {
        expect(checkout('AAAX')).toBe(-1); // Invalid item "X"
    });

    it('should return correct total for mixed items', () => {
        expect(checkout('AAABBBCCC')).toBe(245); // Special offers applied
    });

    it('should return 0 for an empty string', () => {
        expect(checkout('')).toBe(0); // No items in the cart
    });

});

