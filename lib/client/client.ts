import SocketIO from 'socket.io';

export class ShoppingCartClient {

    protected io: SocketIO.Server;

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

}