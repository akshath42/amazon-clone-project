import { formatCurrency } from "../scripts/utils/money.js";

describe('Test suite: format currency', () => {
    it('convert cents to dollars' ,() => {
        expect(formatCurrency(2099)).toEqual('20.99')
    });
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2507.8)).toEqual('25.08')
    })
})