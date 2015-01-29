var express = require('express');
var router = express.Router();
var Page = require("../models").Page;
var User = require("../models").User;
/* GET home page. */
router.get('/', function(req, res, next) {
  Page.find().where('title').ne("").exec(function(err, docs){
  	console.log(docs);
  	res.render('index', { pageBanner: 'BROWSE MY WIKISTACK', docs: docs });
  });
});

router.get('/tag_search', function(req, res){
	Page.find().exec(function(err, pages){
		var uniqueTags = ['...'];
		pages.forEach(function(page){
			console.log(page.tags);
			if (page.tags.length > 0){
				for (var i = 0; i < page.tags.length; i++){
					var isUnique = true;
					for (var x = 0; x < uniqueTags.length; x++){
						if (page.tags[i] == uniqueTags[x]){
							isUnique = false;
						}
					}
					if (isUnique){
						uniqueTags.push(page.tags[i]);
					}
				}
			}
		});
		console.log(uniqueTags);
		res.render('tag_search', { pageBanner: "SEARCH TAGS", tags: uniqueTags });
	});
});

router.get('/tag_search/submit', function(req, res){

});

router.get('/wiki/:url', function(req, res){
	Page.findOne({ 'url_name' : req.params.url }).exec(function(err, page){
		console.log(page);
		res.render('page_template', { page: page });
	});
});

router.get('/about_us', function(req, res){
	res.render('about_us', { pageBanner: 'ABOUT US' });
});

module.exports = router;
