var chat = angular.module('chat', []);

var User = function(name) {
  this.name = name;
  this.getDetails = function() {
    return {
      email: name.toLowerCase() + '@domain.com'
    };
  };
};

chat.controller('Main', function($scope) {
  var notifier = new Notifier();

  $scope.users = [
    new User('Vojta'),
    new User('John'),
    new User('Misko'),
    new User('Igor')
  ];

  $scope.notify = function(user) {
    notifier.send(user, 'msg');
  };
});
