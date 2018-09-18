// query is a dictionary: 
// query = {
//  collection: "name",	
// 	field: "value"
// }
// 
// 
function getLastOpinions(query) {

	// if( !query['collection'] ) {
	// 	throw "Property 'collection' was not defined;"
	// }

	db.getCollection(query['collection_source']).find({'query': query['query']}).limit(200).forEach( data => {
        db.getCollection(query['collection_dest']).insert(data);
	});

}