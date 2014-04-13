'use strict';

describeComponent('component_ui/view_link', function() {

  it('should trigger uiDestroyView when user hits the back button', function() {
    setupComponent(readFixtures('back_button.html'));

    spyOnEvent(document, 'uiDestroyView');
    $('.js-view-link').trigger('click');
    expect('uiDestroyView').toHaveBeenTriggeredOn(document);
  });

  it('should trigger uiCreateView when user hits a chat link', function() {
    setupComponent(readFixtures('chat_view_button.html'));

    var eventSpy = spyOnEvent(document, 'uiCreateView');
    $('.js-view-link').trigger('click');
    expect(eventSpy.mostRecentCall.data).toEqual({name: 'chatView', id: '5'});
  });
});
