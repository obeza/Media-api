'use strict';

var express = require('express');
var router = express.Router();
var modelArticle = require('./../models/article');
var renameKeys = require('deep-rename-keys');

router.route('/articles')
.get((req, res)=>{
    //res.json({ res: "bonjour" });

   modelArticle.find( (err, articles) =>{
        //if(err) return console.log(err);
        res.json({ articles });
    })

})

router.route('/article/:id')
.get((req, res)=>{
    //res.json({ res: "bonjour" });

   modelArticle.findById( req.params.id, (err, article) =>{
        //if(err) return console.log(err);

        res.json( article );
    })

});

router.route('/article')
.post((req, res)=>{

    let data = req.body;

    modelArticle.create( data, (err, article)=>{
        if (err){
            return console.log(err)
        } else {
            res.json({
                code : 'ok',
                id : article._id
            })
        }

    } );
    
})
.put((req, res)=>{

    let data = req.body;

    modelArticle.findOneAndUpdate( { _id : data._id },{
        titre : data.titre,
        contenu : data.contenu,
        rubrique : data.rubrique,
        youtubeId : data.youtubeId,
        adulte : data.adulte,
        publish : data.publish
    }, (err, article)=>{
        if (err){
            return console.log(err)
        } else {
            res.json({
                code : 'ok'
            })
        }

    } );
    
});

router.route('/article/:id')
.delete((req, res)=>{

    modelArticle.remove({_id:req.params.id}, function(err){
        if(err) throw err;
        res.json({
                code : 'ok'
            })
    });
    
})



module.exports = router;