import { AnyObject, PropType, CartItem } from "../type";

export type SCSActions = SCSCreateItemsAction | SCSDeleteItemsAction | SCSUpdateItemsAction;

export type SCSCreateItemsAction = {
    type: 'SCS_CREATE_ITEMS_ACTION';
    items: Array<CartItem>;
}

export type SCSDeleteItemsAction = {
    type: 'SCS_DELETE_ITEMS_ACTION';
    cids: Array<PropType<CartItem, 'cid'>>;
}

export type SCSUpdateItemsAction = {
    type: 'SCS_UPDATE_ITEMS_ACTION';
    updates: Array<{
        cids: Array<PropType<CartItem, 'cid'>>;
        update: Partial<CartItem>;
    }>;
}
