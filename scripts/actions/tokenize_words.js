function tokenizeWords(query) {
	
// Tokenize words from the corpus of the source collection

	db.getCollection(query['collection_source']).find().forEach( function( data ) {

    var cleanedText = data.text.replace(/[.,:?!\-\[\]() ]+/g, ' ');
    var docs = cleanedText.split(' ')
                          .map( function( token ) { 
                              var cleanedToken = token.replace(/["' ]+/g, '').trim();
                              // var googleUrl = ('https://www.google.com/search?q='+cleanedToken).replace(/["' ]+/g, '').trim();
                              // var yahooUrl  = ('https://search.yahoo.com/search?q='+cleanedToken).replace(/["' ]+/g, '').trim();
                              // var bingUrl   = ('www.bing.com/search?q='+cleanedToken).replace(/["' ]+/g, '').trim();
                              
                              // return { 'word': cleanedToken, 'hits': 0, google: googleUrl, yahoo: yahooUrl, bing: bingUrl }; 
                              return { 'word': cleanedToken, 'hits': 0}; 
                          } )
                              db.getCollection(query['collection_dest']).insertMany(docs, { ordered: false });
    
       
	} )

// Then, remove duplicated tokens

	 db.getCollection(query['collection_dest']).aggregate([
	    { "$group": {
	        "_id": "$word",
	        "dups": { "$push": "$_id" },
	        "count": { "$sum": 1 }
	    }},
	    { "$match": { "count": { "$gt": 1 } }}
	    ]).forEach(function(doc) {
	        doc.dups.shift();
	        db.getCollection(query['collection_dest']).remove({ "_id": {"$in": doc.dups }});
	    });

}