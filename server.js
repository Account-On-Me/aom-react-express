import { config } from './config.js';

// mongo
import mongoose from './mongo.js';
mongoose.set('bufferCommands', false);

// express
import { app } from './app.js';
app.listen(config.express.port, (err) => { 
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening on port ${config.express.port}`);
});

