
        var resources = angular.module('etrade.resources', []);

        resources.factory('GamesResource', ['$resource', 'API', function ($resource, API) {
            var resource = $resource(API + '/games', {});
            return resource;
        }]);

        resources.factory('StationsResource', ['$resource', 'API', 'SessionFactory', function ($resource, API, SessionFactory) {
            var resource = $resource(API + '/stations/:id', {id: '@stationID'}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
                'put': {
                    method: 'PUT',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
				'post': {
                    method: 'POST',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                }
            });
            return resource;
        }]);
		
		resources.factory('RoundResource', ['$resource', 'API', 'SessionFactory', function ($resource, API, SessionFactory) {
			var resource = $resource(API + '/rounds/:id', {id: '@roundID'}, {
				'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
				'put': {
                    method: 'PUT',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
				'post': {
                    method: 'POST',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                }
				
			});
			return resource;
		}]);


        resources.factory('TeamsResource', ['$resource', 'API', 'SessionFactory', function ($resource, API, SessionFactory) {
            var resource = $resource(API + '/teams/:id', {id: '@teamID'}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                }
            });
            return resource;
        }]);


        resources.factory('PlayersResource', ['$resource', 'API', 'SessionFactory', function ($resource, API, SessionFactory) {
            var resource = $resource(API + '/players/:id', {id: '@playerID'}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
                'post': {
                    method: 'POST',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'X-GameSessionID': SessionFactory.game.gameSessionID
                    }
                }
            });
            return resource;
        }]);
