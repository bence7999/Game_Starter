app.factory('RoundFactory', ['RoundResource', '$q', 'SessionFactory', function RoundFactory(RoundResource, $q, SessionFactory) {

var uploadrounds = function (StartTime, RoundTerm, RoundNumber) {
	var q = $q.defer();
	var promiseList = [];
	
	var d = new Date(StartTime);
	var startTimeInMS = d.getTime();
	
	var parts = RoundTerm.split(/:/);
	var roundTermInMS = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                       (parseInt(parts[1], 10) * 60 * 1000) + 
                       (parseInt(parts[2], 10) * 1000);
	
	for (i = 0; i < RoundNumber; i++){
		var newStartTime = roundTermInMS*i+startTimeInMS;
		var newEndTime = roundTermInMS*(i+1)+startTimeInMS;
		
		var startTimeInN = new Date();
		startTimeInN.setTime(newStartTime);
		
		var endTimeInN = new Date();
		endTimeInN.getTime(newEndTime);
		
		var promise = RoundResource.post({
			start_time: startTimeInN,
			end_time: endTimeInN,
			roundNumber: i+1
		});
		promiseList.push(promise);
	};
	$q.all(promiseList).then(function(){
		q.resolve();
	});
	return q.promise;

};
	
return {
	'uploadrounds': uploadrounds
};

}]);