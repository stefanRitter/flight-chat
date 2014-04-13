'use strict';

describeComponent('component_ui/view_link', function() {
  var backButtonFixture = '<div><a href="back" class="js-view-link"><span class="arrow-left"></span></a>' +
                          '<div id="appView"></div></div>';
  
  var chatViewButtonFixture = '<div><a href="chatView" class="chat-link js-view-link" id="5">' +
                              '<div id="appView"></div></div>';


  it('should trigger uiDestroyView when user hits the back button', function() {
    setupComponent(backButtonFixture);

    spyOnEvent(document, 'uiDestroyView');
    $('.js-view-link').trigger('click');
    expect('uiDestroyView').toHaveBeenTriggeredOn(document);
  });

  it('should attach and show chatView to appView when user hits a chat link', function() {
    setupComponent(chatViewButtonFixture);
    var appView = $('#appView');
    $('.js-view-link').trigger('click');
    window.setTimeout(function() {
      expect(appView).toHaveClass('show');
    }.bind(this), 200);
  });
});
