db.getCollection('opinions').find().forEach( function( data ) {

	    var cleanedText = data.text.replace(/[.,:?!\-\[\]() ]+/g, ' ');
	    var docs = cleanedText.split(' ').map( function( token ) { 
		var cleanedToken = token.replace(/["' ]+/g, '').trim();
		return { 'word': cleanedToken}; 
	    });
            db.getCollection('vocabulary').insertMany(docs, { ordered: false });
	    
	       
} );
