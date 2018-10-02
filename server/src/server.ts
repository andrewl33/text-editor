import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import {startDB} from './models/dbinit';
import {generate, open, save} from './controllers/code.controller';
import { authenticateAccount, createAccount } from './controllers/auth.controller';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.get('/', homeController.index);
app.get('/generate', generate);
app.post('/open', open);
app.put('/save', save);

// login authentication
app.post('/auth/create', createAccount);
app.post('/auth/login', authenticateAccount);


app.listen(app.get('port'), () => {
  startDB();
  console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;