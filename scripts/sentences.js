db.getCollection('opinions').find({}).forEach( function( data ) {
           var sentences = data.text.match( /[^\.!\?]+[\.!\?]+/g );
            
           if(sentences) {
                  sentences.forEach( function( s ) {
                      db.getCollection('sentences').insert({ sentence: s});
                } );
           }
	            
} )
