(function($) {
  $.fn.clickToggle = function(options) {
    var $clickedElement = this;

    options = $.extend({
      target: $clickedElement.next(),
      targetClass: 'opened',
      clickedClass: '',
      autoClose: false,
      openCallback: null,
      closeCallback: null
    }, options);

    var $targetElement = $(options.target);

    var documentClick = function(event) {
      var $eventTarget = $(event.target);
      if (!$eventTarget.is($clickedElement)) {
        $clickedElement.click();
      }
    };

    $clickedElement.on('click', function(event) {
      event.preventDefault();

      // Open
      if (!$targetElement.hasClass(options.targetClass)) {
        $targetElement.addClass(options.targetClass);
        if (options.clickedClass) {
          $clickedElement.addClass(options.clickedClass);
        }

        if (options.autoClose) {
          // Used setTimeout that event document.click not fire right after attached
          setTimeout(function() {
            $(document).on('click', {attachedElement:$clickedElement}, documentClick);
          }, 10);
        }

        if (options.openCallback) {
          options.openCallback();
        }
      }
      // Close
      else {
        $targetElement.removeClass(options.targetClass);
        if (options.clickedClass) {
          $clickedElement.removeClass(options.clickedClass);
        }

        if (options.autoClose) {
          $(document).off('click', documentClick);
        }

        if (options.closeCallback) {
          options.closeCallback();
        }
      }
    });

    return this;
  };
}(jQuery));
