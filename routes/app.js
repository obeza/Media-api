'use strict';

const express = require('express');
const router = express.Router();
const modelArticle = require('./../models/article');
const renameKeys = require('deep-rename-keys');
const fs = require('fs');

router.route('/articles')
.get((req, res)=>{
    //res.json({ res: "bonjour" });

   modelArticle.find({})
        .select('_id titre')
        .sort({'updatedAt':-1})
        .limit(9)
        .exec(function (err, articles) {
        //if(err) return console.log(err);
        res.json({ articles });
    })

});

router.route('/article/:id')
.get((req, res)=>{
    //res.json({ res: "bonjour" });

   modelArticle.findById( req.params.id, (err, article) =>{
        //if(err) return console.log(err);

        res.json( article );
    })

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