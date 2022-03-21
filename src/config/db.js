const mongoose = require('mongoose');

module.exports =() =>{
    return mongoose.connect('mongodb+srv://niks:niks_1441@cluster0.tkouq.mongodb.net/file-uploads?retryWrites=true&w=majority')
}