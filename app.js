const express = require('express'),
  debug = require('debug')('app:heart'),
  app = express();

// Serve static folders
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => debug(`Server running on port ${PORT}`));
