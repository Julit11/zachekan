import secrets from '../config/secrets';
import {Express} from 'express';

export default function listenCallback(app: Express) {
  return () => {
    console.log(
      '  App is running at http' + ((secrets.server.ws.httpsKeyPath && secrets.server.ws.httpsCertPath && secrets.production) ? 's' : '') + '://%s:%d in %s mode / Worker '
      + process.pid,
      app.get('host'),
      app.get('port'),
      app.get('env'),
    );
  };
}
