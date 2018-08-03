let count = db.sentences_size.count();
var sum = 0
db.sentences_size.find().forEach( function(data){
	sum += data.size;
});
print(sum/count)

