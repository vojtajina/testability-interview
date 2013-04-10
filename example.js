var Notifier = function() {
  var backend = new Backend(app.getConfig('backend_url'), app.getConfig('backend_port'));
  var queue = Notifier.queue;

  this.send = function(user, message)  {
    var email = user.getDetails().email;

    // encode the message
    var msg = 'secret:' + message;

    queue.push([email, msg]);

    if (queue.length === app.getConfig('notifier_batch_limit')) {
      // send it to the backend server
      backend.sendBatch(queue);
      queue.length = 0;
    }
  };
};

Notifier.queue = [];

var Backend = function(url, port) {
  this.sendBatch = function(listOfMessages) {
    console.log('SENDING A BATCH');
    listOfMessages.forEach(function(msg) {
      console.log(msg[0], 'to', msg[1]);
    });
    console.log('===========================');
  };
  // this guy is very expensive and talks to the server a lot
//  throw new Error('I am sending a request to server fucka!');
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
