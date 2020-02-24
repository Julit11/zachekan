export default interface ISecrets {
  production: boolean;
  jwtSecret: string;
  server: {
    ws: {
      host: string;
      port: number;
      httpsKeyPath: string;
      httpsCertPath: string;
      isEnabled: boolean;
    };
    cp: {
      host: string;
      port: number;
      httpsKeyPath: string;
      httpsCertPath: string;
      isEnabled: boolean;
    };
  };
  mysql: {
    user: string;
    password: string;
    database: string;
    host: string;
    port: number
  };
  modules: {
  };
}
