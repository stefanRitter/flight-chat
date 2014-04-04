'use strict';

describeMixin('mixin/with_quick_hash', function() {

  beforeEach(function() {
    setupComponent();
  });

  it('should be defined', function() {
    expect(this.component).toBeDefined();
  });

  it('should generate a hash based on the current time', function() {
    spyOn(Date, 'now').andReturn(1396638303179);
    var hashed = this.component.quickHash('test');
    expect(hashed).toEqual(3556498);
  });
});
