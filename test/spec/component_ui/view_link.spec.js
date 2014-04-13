'use strict';

describeComponent('component_ui/view_link', function() {

  it('should trigger uiDestroyView when user hits the back button', function() {
    setupComponent(readFixtures('back_button.html'));

    spyOnEvent(document, 'uiDestroyView');
    $('.js-view-link').trigger('click');
    expect('uiDestroyView').toHaveBeenTriggeredOn(document);
  });

  it('should attach and show chatView to appView when user hits a chat link', function() {
    setupComponent(readFixtures('chat_view_button.html'));
    
    var appView = $('#appView');
    $('.js-view-link').trigger('click');
    
    window.setTimeout(function() {
      expect(appView).toHaveClass('show');
    }.bind(this), 200);
  });
});
