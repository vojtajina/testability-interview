var Notifier = function(backend) {
  var queue = Notifier.queue;

  this.send = function(user, message)  {
    var email = user.getDetails().email;

    queue.push([email, this.encodeMessage(message)]);

    if (queue.length === app.getConfig('notifier_batch_limit')) {
      // send it to the backend server
      backend.sendBatch(queue);
    }
  };

  this.encodeMessage = function(message) {
    // this will be super difficult algorithm, that needs to be well tested
    return 'secret:' + message;
  }
};

Notifier.queue = [];

var Backend = function(url, port) {
  // this guy is very expensive and talks to the server a lot
  throw new Error('I am sending a request to server fucka!');
};


var app = {
  _cfg: {
    'notifier_batch_limit': 2
  },
  setConfig: function(key, value) {
    this._cfg[key] = value;
  },
  getConfig: function(key) {
    return this._cfg[key];
  }
};
