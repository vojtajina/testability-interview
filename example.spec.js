describe('Notifier', function() {
  describe('encodeMessage', function() {
    it('should encode the message', function() {
      // Notifier explicitly says it requires single dependency - backend
      var n = new Notifier(null, 0);

      // finally expect, whether the encoding was correct
      expect(n.encodeMessage('hello')).toBe('secret:hello');
    });
  });
});
