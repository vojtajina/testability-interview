describe('Notifier', function() {
  describe('encodeMessage', function() {
    it('should encode the message', function() {
      // Notifier explicitly says it requires single dependency - backend
      var n = new Notifier(null, 0, null);

      // finally expect, whether the encoding was correct
      expect(n.encodeMessage('hello')).toBe('secret:hello');
    });
  });

  describe('send', function() {
    it('should send a message to backend', function() {
      var backendMock = jasmine.createSpyObj('Backend', ['sendBatch']);
      var n = new Notifier(backendMock, 1, []);

      var userDetails = {
        email: 'me@domain.com'
      };
      var user = {
        getDetails: function() {
          return userDetails;
        }
      };

      n.send(user, 'howdy');

      expect(backendMock.sendBatch).toHaveBeenCalled();
    });


    it('should batch multiple message into a single call to the backend', function() {
      var backendMock = jasmine.createSpyObj('Backend', ['sendBatch']);
      var n = new Notifier(backendMock, 2, []);

      var userDetails = {
        email: 'me@domain.com'
      };
      var user = {
        getDetails: function() {
          return userDetails;
        }
      };

      n.send(user, 'howdy');
      expect(backendMock.sendBatch).not.toHaveBeenCalled();

      n.send(user, 'again');
      expect(backendMock.sendBatch).toHaveBeenCalled();
    });
  });
});
