describe('Notifier', function() {
  describe('send', function() {
    it('should encode the message', function() {
      // in a more static language like Java or C++, this would be way mooore difficult
      var lastSentMessage = null;
      window.Backend = function(url, port) {
        this.sendBatch = function(listOfMessages) {
          lastSentMessage = listOfMessages[0][1];
        };
      };

      // instantiate innocent Notifier, which is not innocent at all, without the previous hack,
      // it would instantiate Backend, that fires xhr to the server
      var n = new Notifier();

      // we need this crap, even though it's not required by the tested functionality at all
      var userDetails = {
        email: 'some@domain.com'
      };
      var user = {
        getDetails: function() {
          return userDetails;
        }
      };

      // disable the batching, so that even the first message is sent and we can assert it
      app.setConfig('notifier_batch_limit', 1);

      n.send(user, 'hello');

      // finally expect, whether the encoding was correct
      expect(lastSentMessage).toBe('secret:hello');
    });
  });
});
