var mongoose = require('mongoose');

var ArticlesSchema = new mongoose.Schema({
        titre : { type:String, required:true, trim:true },
        contenu : { type:String, trim:true },
        rubrique : { type:String, trim:true },
        youtubeId : { type:String, trim:true },
        adulte : { type:Boolean, default:false },
        publish : { type:Boolean, default:false }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Articles', ArticlesSchema); 