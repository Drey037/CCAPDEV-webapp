const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const url = process.env.MONGODB_LOCAL;

//const url = 'mongodb://127.0.0.1/ReelTalkDB';     // Will have to change this for when we use MongoDB Atlas

const Comment = require('./Comment');
const LoginInfo = require('./Login-Info');
const Review = require('./Review');
const ShowInfo = require('./Show-Info');
const UserInfo = require('./User-Info');
const Watchlist = require('./Watchlist');


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: async function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) {
                console.log(error);
                return callback(false);
            }
            console.log('Added ' + result);
            return callback(result);
        });
    },

    insertMany: async function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: async function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) {
                console.log(error);
                return callback(false);
            }
            return callback(result);
        });
    },

    findMany: async function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            console.log(typeof result);
            return callback(result);
        });
    },

    updateOne: async function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) {
                console.log(error);
                return callback(false);
            }
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: async function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: async function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: async function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }
};

module.exports = database;
