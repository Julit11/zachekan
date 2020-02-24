import UserSocket from './sockets/UserSocket';
import ASocketController from './ASocketController';

export default class UsersController extends ASocketController {
  SocketClass;
  namespace;

  initProperties() {
    this.SocketClass = UserSocket;
    this.namespace = 'users';
  }
}
