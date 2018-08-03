db.getCollection('opinions').find({}).forEach( function( data ) {
           var sentences = data.text.match( /[^\.!\?]+[\.!\?]+/g );
            
           if(sentences) {
           	db.getCollection('sentences_size').insert({ size: sentences.length});
           }
	            
} );
