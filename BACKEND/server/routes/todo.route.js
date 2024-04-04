'use strict';

const Joi = require('joi');
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/todo.API')
            server.route([
                {
                    method: 'GET',
                    path: '/todos',
                    config: {
                        validate: API.getTodo.validate,
                        pre: API.getTodo.pre,
                        handler: API.getTodo.handler
                    }
                },
                {
                    method: 'POST',
                    path: '/todos',
                    config: {
                        validate: API.saveTodo.validate,
                        pre: API.saveTodo.pre,
                        handler: API.saveTodo.handler
                    }
                },
                {
                    method: 'PUT',
                    path: '/todos/{id}',
                    config: {
                        validate: API.updateTodo.validate,
                        pre: API.updateTodo.pre,
                        handler: API.updateTodo.handler,
                    }
                },
                {
                    method: 'DELETE',
                    path: '/todos/{id}',
                    config: {
                        validate: API.deleteTodo.validate,
                        pre: API.deleteTodo.pre,
                        handler: API.deleteTodo.handler,
                    }
                },
            ])
        },
        version: require('../../package.json').version,
        name : 'todo-routes'
    }
}