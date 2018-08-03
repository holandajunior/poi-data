db.opinions.find({}).forEach( function( data ) {
	var author = { id: data.author.memberSince + data.author.reviews + data.author.ratings + data.author.postForum + data.author.helpfulVotes + data.author.level};
	db.authors.insert(author);
} );
