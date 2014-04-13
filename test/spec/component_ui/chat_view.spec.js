'use strict';

describeComponent('component_ui/chat_view', function () {

  describe('initialization', function() {
    
    it('should trigger uiNeedsConversation on initialization', function() {
    });

    it('should trigger uiConversationSeen on initialization', function() {
    });

    it('should render chatView and show it after initialization', function() {
    });

    it('should render the conversation on dataConversation', function() {
    });
  });

  describe('chatting behaviour', function() {
    beforeEach(function() {
      setupComponent();
    });
    
    it('should confirm a message was sent on dataMessageSent', function() {
    });

    it('should trigger uiFormProcessed when user has sent a message, on dataEmitMessage', function() {
    });

    it('should render a new message on dataMessageReceived', function() {
    });
  });

  describe('tear down', function() {
    beforeEach(function() {
      setupComponent();
    });

    it('should hide the view on uiDestroyView', function() {
    });

    it('should teadown on uiDestroyView', function() {
    });
  });
});

