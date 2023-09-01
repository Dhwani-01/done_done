const initOptions = {
    // Initialization Options
  };
  
  const pgp = require('pg-promise')(initOptions);
  const db = pgp('postgres://postgres:abc123@localhost:5432/project');
  
  module.exports = db;
  