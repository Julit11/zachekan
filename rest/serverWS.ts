import * as express from 'express';
import * as io from 'socket.io';
import * as fs from 'fs';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import secrets from './config/secrets';
import listenCallback from './helpers/listenCallback';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import {join} from "path";
import * as ExpressSession from 'express-session';
import * as sharedSession  from 'express-socket.io-session';
import UsersController from "./controllers/UsersController";

const app = express();
let server;
let ws;
const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../frontend-ssr/main');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

const session = ExpressSession({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

app.use(session);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'frontend'));

app.set('port', secrets.server.ws.port);
app.set('host', secrets.server.ws.host);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', join(DIST_FOLDER, 'frontend'));
app.get('*.*', express.static(join(DIST_FOLDER, 'frontend')));

export default async () => {
    if (!secrets.production || !secrets.server.ws.httpsKeyPath || !secrets.server.ws.httpsCertPath) {
        server = app.listen(app.get('port'), app.get('host'), listenCallback(app));
    } else {
        server = https.createServer({
            key: fs.readFileSync(secrets.server.ws.httpsKeyPath),
            cert: fs.readFileSync(secrets.server.ws.httpsCertPath)
        }, app).listen(app.get('port'), app.get('host'), listenCallback(app));
    }

    ws = io(server, {serveClient: false});

    ws.use(sharedSession(session, {
        autoSave:true
    }));

    ws.on('connection', () => {
        console.log('helloooooo');
    });

    const usersController = new UsersController(ws, session);

    app.get('*', (req, res) => {
        res.render('index', { req });
    });
};
