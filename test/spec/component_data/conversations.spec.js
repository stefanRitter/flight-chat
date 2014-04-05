'use strict';

describeComponent('component_data/conversations', function () {
  var message = [
    {name: 'text', value: 'test message'},
    {name: 'conversationId', value: 5},
    {name: '_id', value: 5}
  ];


  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });
  
  it('should trigger dataNewConversation when a new conversation was started', function() {
    spyOnEvent(document, 'dataNewConversation');
    this.component.trigger('dataMessageIncoming', {
      text: 'test text',
      conversationId: 20
    });
    expect('dataNewConversation').toHaveBeenTriggeredOn(document);
  });
  
  it('should trigger dataMessageReceived when a new message came in', function() {
    spyOnEvent(document, 'dataMessageReceived');
    this.component.trigger('dataMessageIncoming', {
      text: 'test text',
      conversationId: 20,
      _id: 0
    });
    expect('dataMessageReceived').toHaveBeenTriggeredOn(document);
  });

  it('should emit message on uiEmitMessage', function() {
    spyOnEvent(document, 'dataEmitMessage');
    this.component.trigger('uiEmitMessage', {formData: message});
    expect('dataEmitMessage').toHaveBeenTriggeredOn(document);
  });
  
  it('should emit message on uiReEmitMessage', function() {
    spyOnEvent(document, 'dataEmitMessage');
    this.component.activeConvs[5] = [];
    this.component.trigger('uiReEmitMessage', {formData: message});
    expect('dataEmitMessage').toHaveBeenTriggeredOn(document);
  });

  it('should trigger dataMessageSent when a message was succesfully sent', function() {
    spyOnEvent(document, 'dataMessageSent');
    this.component.activeConvs[10] = [{message: true}];
    this.component.trigger('dataMessageIncoming', {
      text: 'test text',
      conversationId: 10,
      _id: 0
    });
    expect('dataMessageSent').toHaveBeenTriggeredOn(document);
  });

  it('should get a conversation on uiNeedsConversation', function() {
    // TODO
  });
});
