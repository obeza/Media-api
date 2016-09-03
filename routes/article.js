'use strict';

const express = require('express');
const router = express.Router();
const modelArticle = require('./../models/article');
const renameKeys = require('deep-rename-keys');
const fs = require('fs');

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
    console.log( data.titre );

    modelArticle.create( {
        titre : data.titre,
        contenu : data.contenu,
        rubrique : data.rubrique
    }, (err, article)=>{
        if (err){
            console.log(err);
            res.json({
                code : 'error'
            })
             
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
            console.log("modifie " + data.titre);
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

router.get( '/remove/:id', (req, res)=>{

  fs.unlinkSync('public/' + req.params.id );
  res.json({code:'ok'});

})

module.exports = router;