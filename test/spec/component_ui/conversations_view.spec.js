'use strict';

describeComponent('component_ui/conversations_view', function () {
  var conversationData = {
    conversationId: 5,
    user: {
      imageUrl: '',
      name: 'test user'
    },
    text: 'test message'
  };

  beforeEach(function () {
    setupComponent(readFixtures('conversations_view.html'));
    this.component.trigger('dataNewConversation', conversationData);
  });

  it('should add a new conversation on dataNewConversation', function () {
    expect($('#chats a').length).toEqual(1);
  });

  it('should mark a new conversation as seen on uiConversationSeen', function () {
    this.component.trigger('uiConversationSeen', conversationData);
    expect($('a.chat-link')).not.toHaveClass('active');
  });

  it('should mark a conversation as unread on dataMessageReceived', function () {
    this.component.trigger('uiConversationSeen', conversationData);
    this.component.trigger('dataMessageReceived', conversationData);
    expect($('a.chat-link')).toHaveClass('active');
  });
});
