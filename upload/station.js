app.factory('UploadFactory', ['StationsResource', '$q', 'SessionFactory', function UploadFactory(StationsResource, $q, SessionFactory) {

var uploadStations = function (newStations) {
	var q = $q.defer();
	var promiseList = [];
	for (i = 0; i < newStations.length; i++) { 
		var promise = StationsResource.post({
				name: newStations[i].name
			});
		promiseList.push(promise);
	};
	$q.all(promiseList).then(function(){
		q.resolve();
	});
	return q.promise;
};
	
return {
	'uploadStations': uploadStations
};

}]);