import {Socket} from 'socket.io';
import ASocket from "./ASocket";
import {boundClass} from 'autobind-decorator';
import {OnSuccess} from "../../decorators/SocketDecorators";

@boundClass
export default class UserSocket extends ASocket {
  constructor(socket: Socket) {
    super(socket);

    console.log('hello world');

    this.socket.on('sign in', this.signIn);
    this.socket.on('sign up', this.signUp);
  }

  @OnSuccess('sign in')
  private signIn() {
  }

  @OnSuccess('sign up')
  private signUp() {
  }
}
