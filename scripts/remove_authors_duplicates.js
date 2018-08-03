db.authors.aggregate([
	    { "$group": {
		            "_id": "$id",
		            "dups": { "$push": "$_id" },
		            "count": { "$sum": 1 }
		        }},
	    { "$match": { "count": { "$gt": 1 } }}
	    ]).forEach(function(doc) {
		            doc.dups.shift();
		            db.authors.remove({ "_id": {"$in": doc.dups }});
		        });

