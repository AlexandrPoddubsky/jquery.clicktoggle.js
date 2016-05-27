(function($) {
  var documentClickAttached = false;
  var autoCloseElements = [];

  $.fn.clickToggle = function(options) {
    var $clickedElement = this;

    if ($clickedElement.data('clickToggleAttached')) {
      return this;
    }

    options = $.extend({
      target: $clickedElement.next(),
      targetClass: 'opened',
      clickedClass: '',
      autoClose: false,
      openCallback: null,
      closeCallback: null
    }, options);

    var $targetElement = $(options.target);

    // Clicked element click handler
    $clickedElement.on('click', function(event, stopPropagation) {
      event.preventDefault();

      // Open
      if (!$targetElement.hasClass(options.targetClass)) {
        $targetElement.addClass(options.targetClass);
        if (options.clickedClass) {
          $clickedElement.addClass(options.clickedClass);
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

        if (options.closeCallback) {
          options.closeCallback();
        }
      }

      if (stopPropagation) {
        event.stopPropagation();
      }
    });

    // Document click handler
    if (options.autoClose && !documentClickAttached) {
      $(document).on('click', function(event) {
        var $eventTarget = $(event.target);
        var $clickedElement;
        var $targetElement;
        var targetClass;

        for (var i = 0; i < autoCloseElements.length; i++) {
          $clickedElement = autoCloseElements[i].clickedElement;
          $targetElement = autoCloseElements[i].targetElement;
          targetClass = autoCloseElements[i].targetClass;

          if ($targetElement.hasClass(targetClass)
          && $eventTarget.closest($clickedElement).length == 0
          && $eventTarget.closest($targetElement).length == 0) {
            $clickedElement.trigger('click', [true]);
          }
        }
      });

      documentClickAttached = true;
    }

    if (options.autoClose) {
      autoCloseElements.push({
        clickedElement: $clickedElement,
        targetElement: $targetElement,
        targetClass: options.targetClass
      });
    }

    $clickedElement.data('clickToggleAttached', true);

    return this;
  };
}(jQuery));
