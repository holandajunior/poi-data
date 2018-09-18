function fixAuthorsDatatype(query) {

	db.getCollection(query['collection']).find({}).forEach( function(r) {
	    
	    r.author.reviews = new NumberInt(r.author.reviews);
	    r.author.level = new NumberInt(r.author.level);
	    r.author.helpfulVotes = new NumberInt(r.author.helpfulVotes);
	    r.author.postForum = new NumberInt(r.author.postForum);
	    
	    db.getCollection(query['collection']).save(r)
    
    });
}