import {Socket, Server, Namespace} from 'socket.io';
import ASocket from './sockets/ASocket';
import {boundClass} from 'autobind-decorator';
import * as sharedSession  from 'express-socket.io-session';

@boundClass
export default abstract class ASocketController {
  public abstract SocketClass;
  public abstract namespace: string;

  private session;

  sockets: Namespace;

  socketsControllers: ASocket[] = [];

  constructor(ws: Server, session?) {
    this.initProperties();
    this.session = session;
    this.initSockets(ws);
  }

  abstract initProperties();

  initSockets(ws: Server) {
    this.sockets = ws.of(this.namespace);

    if (this.session) {
      this.sockets.use(sharedSession(this.session, {
        autoSave: true
      }));
    }

    this.sockets.on('connection', this.onConnection);
  }

  protected onConnection(socket: Socket) {
    const SocketClass: any = this.SocketClass;
    this.socketsControllers.push(new SocketClass(socket));
    this.afterConnection(socket);
  }

  protected afterConnection(socket: Socket) {
  }
}
