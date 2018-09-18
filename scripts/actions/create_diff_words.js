function createDiffWords(query) {

	db.getCollection(query['collection_source']).find({}).forEach( function( data ) {
	  var word = db.getCollection(query['collection_comp']).findOne({'word': data.word});

	  if(!word) {
	    db.getCollection(query['collection_diff']).insert(data);
	  }  
	})

}