"use strict";

const Joi = require("joi");
const config = require("config");
const todo = require("./validator/todo.validator");

const Todo = require("@models/todo.model").schema;

module.exports = {
  getTodo: {
    validate: {},
    pre: [
      {
        assign: "getTodo",
        method: async (request, h) => {
          try {
            const todos = await Todo.find();
            return todos;
          } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.getTodo).code(200);
    },
  },

  saveTodo: {
    validate: todo.todoValidator,
    pre: [
      {
        assign: "saveTodo",
        method: async (request, h) => {
          try {
            const { text } = request.payload;
            const todo = new Todo({ text });
            await todo.save();
            return todo;
          } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.saveTodo).code(200);
    },
  },

  updateTodo: {
    validate: {},
    pre: [
      {
        assign: "updateTodo",
        method: async (request, h) => {
          try {
            const { id } = request.params;
            const { text, completed } = request.payload;
            const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
            return updatedTodo;
          } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.updateTodo).code(200);
    },
  },

  deleteTodo: {
    validate: {},
    pre: [
      {
        assign: "deleteTodo",
        method: async (request, h) => {
          try {
            // console.log(request.params);
            const { id } = request.params;
            const deletedTodo = await Todo.findByIdAndDelete(id);
            return deletedTodo;
          } catch (error) {
            return h.response({ error: 'Internal Server Error' }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deleteTodo).code(200);
    },
  }
};
