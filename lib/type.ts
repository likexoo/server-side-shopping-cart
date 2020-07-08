import { ObjectId } from "bson";
import { Store } from "redux";
import { SCSActions } from "./server/server.action";

// *********************
// Default
// *********************

export type Cart = {
    id: string;
    items: Array<CartItem>;
    store: Store<Cart, SCSActions>;
}

export interface CartItem {
    cid: string | ObjectId;
    labels: Array<CartItemLabel>;
    [key: string]: any;
};

export type CartItemLabel = {
    type: string;
    value: any;
};

export declare type PropType<T, P extends keyof T> = T[P];

export interface AnyObject {
    [property: string]: any;
};

// *********************
// Rule
// *********************

export type Rule = {
    
};
