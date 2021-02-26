const debug = require('debug')('app:startup');
const cors = require('cors')
const config = require('config');
const tickets = require('./routes/tickets');
const express = require("express");
// morgan = require('morgan');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const ticket = require('./routes/ticket');
const closeTicket = require ('./routes/closeTicket');
 

  if (app.get('env') === 'development')
  app.use(cors());
    
  app.use(express.json());
    app.use(helmet());

    
    if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("Morgan enabled...");
    };
    
    
    
    app.use('/api/ticket', ticket);
    app.use('/api/status', closeTicket);
    app.use('/api/tickets', tickets);
     app.use('/api/users', users);
     app.use('/api/auth', auth);
    app.use('/api/me', users);

const port = process.env.PORT || config.get("port");
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});
