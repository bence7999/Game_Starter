app.controller('StationCtrl',['$scope', 'GamesResource', 'SessionFactory', 'StationsResource', '$q', 'UploadFactory', 'RoundFactory', function StationCtrl($scope, GamesResource, SessionFactory, StationsResource,  $q, UploadFactory, RoundFactory) {
  $scope.stations = [];
 
  $scope.addStation = function() {
    $scope.stations.push({name:$scope.stationName});
    $scope.stationName = '';
  };

  window.scope = $scope;
  
  $scope.dropstation = function(no) {
	$scope.stations.splice(no,1);
  };
 
 var gameSessionID;
 
 $scope.ServerName = "zugliget";
 $scope.ServerPasswd = "passwd";
 $scope.StartTime = "2015/01/10 10:10:10";
 $scope.RoundTerm = "10:10:10";
 $scope.RoundNumber = "4";
 
  $scope.callRest = function(){
  var date = new Date($scope.StartTime);
  var dateMillis = date.getTime();
  
  var timePeriod =  $scope.RoundTerm;
  var parts = timePeriod.split(/:/);
  var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                       (parseInt(parts[1], 10) * 60 * 1000) + 
                       (parseInt(parts[2], 10) * 1000);
  var newDate = new Date();
  newDate.setTime(dateMillis + timePeriodMillis);
  
	GamesResource.save({
					serverName: $scope.ServerName,
					serverPassword: $scope.ServerPasswd,
					roundNumber: $scope.RoundNumber,
					start_time: date.getTime(),
					end_time: newDate.getTime()
                }, function () {
					GamesResource.get({
					serverName: $scope.ServerName,
					serverPassword: $scope.ServerPasswd
				},function (gameObj) {
					alert(gameObj.gameSessionID);
					gameSessionID = gameObj.gameSessionID;
					SessionFactory.game.gameSessionID = gameObj.gameSessionID;
					SessionFactory.setGame(gameObj);
					//window.SessionFactory = SessionFactory;
					UploadFactory.uploadStations($scope.stations);
					RoundFactory.uploadrounds($scope.StartTime, $scope.RoundTerm, $scope.RoundNumber);
                });
			});
  
  };
 
}]);
	