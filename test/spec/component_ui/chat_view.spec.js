'use strict';

describeComponent('component_ui/chat_view', function () {
  var conversationData = {
    message: {
      _id: 0,
      user: {_id: 0},
      imageUrl: '/img/test.png',
      text: 'test message 0',
      conversationId: 5
    },
    message1: {
      user: {_id: 1},
      _id: 1,
      imageUrl: '/img/test.png',
      text: 'test message 1',
      conversationId: 5
    },
    message2: {
      user: {_id: 0},
      _id: 2,
      imageUrl: '/img/test.png',
      text: 'test message 3',
      conversationId: 5
    }
  };

  var messageData = {
    _id: 10,
    user: {imageUrl: ''},
    text: 'test text',
    conversationId: 5,
  };

  beforeEach(function () {
    window.__APP.__USER = {_id: 1};
  });

  afterEach(function() {
    delete window.__APP.__USER;
  });


  describe('initialization', function() {
    beforeEach(function() {
      setupComponent(readFixtures('app_view.html'));
    });

    it('should be defined', function () {
      expect(this.component).toBeDefined();
    });

    it('should trigger uiNeedsConversation on initialization', function() {
      var eventSpy = spyOnEvent(document, 'uiNeedsConversation');
      this.component.trigger('uiCreateView', {name: 'chatView', id: 5});
      expect(eventSpy.mostRecentCall.data).toEqual({conversationId: 5});
    });

    it('should render chatView and show it after initialization', function() {
      expect($('#appView')).not.toBeVisible();
      this.component.trigger('uiCreateView', {name: 'chatView', id: 5});
      expect($('#appView')).toBeVisible();
    });

    it('should render the conversation on dataConversation', function() {
      expect($('.chat-message').length).toEqual(0);
      this.component.trigger('uiCreateView', {name: 'chatView', id: 5});
      this.component.trigger('dataConversation', conversationData);
      expect($('.chat-message').length).toEqual(3);
    });
  });


  describe('chatting behaviour', function() {
    beforeEach(function() {
      setupComponent(readFixtures('app_view.html'));
      this.component.trigger('uiCreateView', {name: 'chatView', id: 5});
      this.component.trigger('dataConversation', conversationData);
    });

    it('should display a newly sent message on dataEmitMessage', function() {
      expect($('.chat-message').length).toEqual(3);
      this.component.trigger('dataEmitMessage', messageData);
      expect($('.chat-message').length).toEqual(4);
    });

    it('should trigger uiFormProcessed when user has sent a message, on dataEmitMessage', function() {
      spyOnEvent(document, 'uiFormProcessed');
      this.component.trigger('dataEmitMessage', messageData);
      expect('uiFormProcessed').toHaveBeenTriggeredOn(document);
    });
    
    it('should confirm a message was sent on dataMessageSent', function() {
      expect($('.chat-message-not-sent').length).toEqual(0);
      this.component.trigger('dataEmitMessage', messageData);
      expect($('.chat-message-not-sent').length).toEqual(1);
      this.component.trigger('dataMessageSent', messageData);
      expect($('.chat-message-not-sent').length).toEqual(0);
    });

    it('should render a new message on dataMessageReceived', function() {
      expect($('.chat-message').length).toEqual(3);
      this.component.trigger('dataMessageReceived', messageData);
      expect($('.chat-message').length).toEqual(4);
    });
  });


  describe('destroy', function() {
    beforeEach(function() {
      setupComponent(readFixtures('app_view.html'));
      this.component.trigger('uiCreateView', {name: 'chatView', id: 5});
      this.component.trigger('dataConversation', conversationData);
    });

    it('should empty this.attr.$chatMessages on uiDestroyView', function() {
      expect(this.component.attr.$chatMessages.length).not.toEqual(0);
      this.component.trigger('uiDestroyView', {});
      expect(this.component.attr.$chatMessages.length).toEqual(0);
    });

    it('should trigger uiConversationSeen on destroy', function() {
      var eventSpy = spyOnEvent(document, 'uiConversationSeen');
      this.component.trigger('uiDestroyView', {});
      expect(eventSpy.mostRecentCall.data).toEqual({conversationId: 5});
    });
  });
});

