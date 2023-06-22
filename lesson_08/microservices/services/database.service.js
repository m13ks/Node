const { Service } = require("moleculer")
const mongoose = require("mongoose")

module.exports = {
  name: "database",
  mixins: [Service],

  started() {
    const mongoDBUrl = "mongodb://test:test@localhost:27017/test"
    mongoose
      .connect(mongoDBUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => this.logger.info("Connected to MongoDB"))
      .catch((error) => {
        this.logger.error("Error connecting to MongoDB:", error)
        process.exit(1)
      })
  },
}
