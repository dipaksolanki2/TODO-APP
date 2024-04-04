const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn();

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

exports.schema = dbConn.model('Todo', todoSchema);