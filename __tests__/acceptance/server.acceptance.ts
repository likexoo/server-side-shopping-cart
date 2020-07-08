import { ShoppingCartServer } from "../../lib/server/server";
import { expect } from "chai";

describe('Server Reducer', () => {

    before(async () => {

    });

    it(`cart reducer with actions`, async () => {

        const SCS = new ShoppingCartServer(4683);
        SCS.createCart('cart1');
        const Cart1Store = SCS.findCart('cart1')!.store;

        const result1 = Cart1Store.getState();
        expect(result1).instanceOf(Array).length(0);

        Cart1Store.dispatch({
            type: 'SCS_CREATE_ITEMS_ACTION',
            items: [
                {
                    cid: '01',
                    labels: []
                },
                {
                    cid: '02',
                    labels: []
                }
            ]
        })
        const result2 = Cart1Store.getState();

        expect(result2).instanceOf(Array).length(2);
        expect(result2).property('0').property('cid').equal('01');
        expect(result2).property('1').property('cid').equal('02');

        Cart1Store.dispatch({
            type: 'SCS_DELETE_ITEMS_ACTION',
            cids: ['02']
        })
        const result3 = Cart1Store.getState();

        expect(result3).instanceOf(Array).length(1);
        expect(result3).property('0').property('cid').equal('01');

        Cart1Store.dispatch({
            type: 'SCS_UPDATE_ITEMS_ACTION',
            updates: [
                {
                    cids: ['01'],
                    update: {
                        name: 'dish01'
                    }
                }
            ]
        })
        const result4 = Cart1Store.getState();

        expect(result4).instanceOf(Array).length(1);
        expect(result4).property('0').property('cid').equal('01');
        expect(result4).property('0').property('name').equal('dish01');

        await SCS.stop();

    });

});