import { CartItem } from "../type";
import { SCSActions } from "./server.action";
import _ from "lodash";

export const ShoppingCartServerReducer = (state: Array<CartItem> = [], action: SCSActions) => {
    let newState: Array<CartItem> = _.cloneDeep([state])[0] || [];
    switch (action.type) {
        case 'SCS_CREATE_ITEMS_ACTION': {
            newState.push(...(action.items || []));
            break;
        }
        case 'SCS_DELETE_ITEMS_ACTION': {
            action.cids.forEach(id => {
                let index = newState.findIndex(i => `${i.cid}` === `${id}`);
                if (index !== -1) newState.splice(index, 1);
            });
            break;
        }
        case 'SCS_UPDATE_ITEMS_ACTION': {
            action.updates.forEach(u => {
                u.cids.forEach(id => {
                    let index = newState.findIndex(i => `${i.cid}` === `${id}`);
                    if (index !== -1) {
                        Object.keys(u.update || {}).forEach(k => {
                            if (k === 'id') return;
                            _.set(newState, `[${index}].${k}`, _.get(u.update, k));
                        });
                    }
                });
            });
            break;
        }
    };
    return newState;
};