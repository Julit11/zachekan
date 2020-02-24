import ISocketEventConfig from '../../../common/interfaces/ISocketConfig';
import uuid from 'uuid';

export function WsEvent(event: ISocketEventConfig, needAuth = true): any {
  return (target: object, propertyKey: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
      || {configurable: true, enumerable: true};

    descriptor.value = function(request) {
      const args = arguments;

      const removeListeners = (timeoutId: number, uid: string) => {
        if (event.success) {
          this.socket.removeEventListener(event.success + '/' + uid);
        }
        if (event.error) {
          this.socket.removeEventListener(event.error + '/' + uid);
        }

        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };


      return new Promise<void>(function(resolve, reject) {
        if (!request) {
          request = {};
        }

        const id = uuid.v4();

        request.uuid = id;

        console.log('await ', event.success + '/' + id);

        const timeoutId: number = +(setTimeout(() => {
          reject(new Error('Timeout'));
          removeListeners(undefined, id);
          return;
        }, 15000));


        if (needAuth) {
          this.socket.emit(event.name, ...args);
        } else {
          this.socket.emit(event.name, ...args);
        }
        if (!event.success && !event.error) {
          removeListeners(timeoutId, id);
          resolve();
        }

        if (event.success) {
          this.socket.on(event.success + '/' + id, (result) => {
            removeListeners(timeoutId, id);
            console.log('resolve');
            resolve(result);
            return;
          });
        }

        if (event.error) {
          this.socket.on(event.error + '/' + id, (error) => {
            removeListeners(timeoutId, id);
            reject(new Error(error));
            return;
          });
        }
      }.bind(this));
    };

    return descriptor;
  };
}
