db.vocabulary.aggregate([
	    { "$group": {
	            "_id": "$word",
	            "dups": { "$push": "$_id" },
	            "count": { "$sum": 1 }
	    }},
	    { "$match": { "count": { "$gt": 1 } }}
]).forEach(function(doc) {
	doc.dups.shift();
	db.vocabulary.remove({ "_id": {"$in": doc.dups }});
});

