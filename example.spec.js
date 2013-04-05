describe('Notifier', function() {
  describe('encodeMessage', function() {
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

      // finally expect, whether the encoding was correct
      expect(n.encodeMessage('hello')).toBe('secret:hello');
    });
  });
});
