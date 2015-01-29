var express = require('express');
var router = express.Router();
var marked = require('marked');

router.get('/', function(req, res){
	res.render('addpage', { pageBanner: 'ADD A PAGE' });
});

router.post('/submit', function(req, res){
		var models = require('../models/');
		var title = req.body.pageTitle;
		var body = req.body.pageContent;
		var tagString = req.body.pageTags;
		var tags = [];
		if (tagString != "" && typeof tagString != "undefined"){
			var splitTagString = tagString.split(" ");
			splitTagString.forEach(function(tag){
				var cleanedTag = tag.split(",");
				tags.push(cleanedTag[0]);
			});
		}
		var alpha = "abcdefghijklmnopqrstuvwxyz";
		var url_name;
		if (title != "" && typeof title != "undefined"){
			var cleanTitle = title.split("");
			var newTitle = [];
			cleanTitle.forEach(function(chara){
				if (alpha.indexOf(chara.toLowerCase()) != -1){
					newTitle.push(chara);
				}
				else if (chara == " "){
					newTitle.push("_");
				}
			});
			url_name = newTitle.join("");
		}
		else{
			url_name = Math.random().toString(36).substring(2,7);
			title = url_name;
		}
		var p = new models.Page({ "title": title, "body": body, "url_name": url_name, "tags": tags });
		p.save();
		res.redirect("/add");
});

module.exports = router;
