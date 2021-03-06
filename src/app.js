'use strict';

const path       = require('path');
const favicon    = require('serve-favicon');
const compress   = require('compression');
const cors       = require('cors');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const history    = require('connect-history-api-fallback');

const feathers      = require('feathers');
const configuration = require('feathers-configuration');
const hooks         = require('feathers-hooks');
const rest          = require('feathers-rest');
const socketio      = require('feathers-socketio');

const middleware = require('./middleware');
const services   = require('./services');
const appHooks   = require('./app.hooks');

const authentication = require('./authentication');
const rethinkdb      = require('./rethinkdb');
const webpack        = require('./webpack');

const { profiler } = require('feathers-profiler');

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use(history({
  rewrites: [
    {
      from: /(?:^\/api\/.+)|(?:^\/auth(?:entication)?)/,
      to  : rule => rule.parsedUrl.pathname,
    },
  ],
}));
if (app.get('env') === 'development') app.configure(webpack);
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rethinkdb);
app.configure(rest());
app.configure(socketio(
  (io) => {
    io.use((socket, next) => {
      socket.feathers.ip = socket.conn.remoteAddress;
      next();
    });
  }
));

app.use((req, res, next) => {
  req.feathers.ip = req.ip;
  
  next();
});

app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
app.configure(profiler({ stats: 'detail' }));
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);

module.exports = app;
