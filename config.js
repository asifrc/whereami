var CONFIG = {
  "DB": {
    "URL": process.env.MONGO_DB || "mongodb://localhost/whereami"
  },
  "USE_LOCAL_ASSETS": process.env.USE_LOCAL_ASSETS || false,
};

module.exports = CONFIG;
