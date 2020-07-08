import SocketIO from 'socket.io';
import { Rule, Cart, CartItem } from '../type';
import NodeCache from "node-cache";
import { Store, createStore } from 'redux';
import { ShoppingCartServerReducer } from './server.reducer';
import { SCSActions } from './server.action';

export class ShoppingCartServer {

    protected io: SocketIO.Server;
    private carts: Array<Cart> = [];
    protected nodecache: NodeCache = new NodeCache();

    private rules: Array<Rule> = [];

    constructor(
        port: string | number,
        opts?: SocketIO.ServerOptions
    ) {
        this.io = SocketIO(port, opts);
        // events
        this.io.on(
            'UPDATE_CART_ITEMS_EVENT',
            () => { }
        );
    }

    public async stop(): Promise<void> {
        return await new Promise<void>((resolve: any, reject: any) => {
            this.io.close(() => {
                resolve();
            });
        });
    }

    public createCart(id: string, items: Array<CartItem> = []): void {
        const store: Store<Cart, SCSActions> = createStore(ShoppingCartServerReducer);
        this.carts.push({ id, items, store });
    }

    public findCart(id: string): Cart | undefined {
        return this.carts.find(c => c.id === id);
    }

}