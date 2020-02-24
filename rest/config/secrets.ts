import ISecrets from '../interfaces/ISecrets';

const secrets: ISecrets = {
  production: true,
  jwtSecret: 'A TEST SECRET',
  server: {
    ws: {
      host: 'localhost',
      port: 4201,
      httpsKeyPath: undefined,
      httpsCertPath: undefined,
      isEnabled: true
    },
    cp: {
      host: 'localhost',
      port: 4211,
      httpsKeyPath: undefined,
      httpsCertPath: undefined,
      isEnabled: true
    },
  },
  mysql: {
    user: 'root',
    password: '',
    database: 'v3-wbbc-2',
    host: '127.0.0.1',
    port: 3306
  },
  modules: {
  },
};

export default secrets;
