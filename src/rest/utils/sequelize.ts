import {Sequelize} from 'sequelize-typescript';
import secrets from '../config/secrets';
import * as mysql2 from 'mysql2';

let sequelize: Sequelize;

export const initSequelize = () => {

    sequelize = new Sequelize(
        secrets.mysql.database,
        secrets.mysql.user || 'root',
        secrets.mysql.password,
        {
            host: secrets.mysql.host || 'localhost',
            dialect: 'mysql',
            port: secrets.mysql.port || 3306,
            pool: {
                max: 100,
                idle: 2000
            },
            logging: false,
            dialectModule: mysql2
        },

    );

    sequelize.addModels([__dirname + '/../models/sql/*']);
};


export default sequelize;
