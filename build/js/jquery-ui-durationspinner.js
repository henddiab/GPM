(function($) {
  $.widget('ui.durationspinner', $.ui.spinner, {
    options: {
      min: 02,
      step: 60,
      page: 60,
      format: 'hh:mm'
    },

    _parse: function(value) {
      if (typeof value === 'string') {
        if (Number(value) == value) {
          return Number(value);
        }
        var time = value.split(/[^\d]+/);
        var fmt = this.options.format.replace(/\[.*\]/g, '').split(/[^dhms]+/);
        var seconds = 0;
        for (var i=0; i<fmt.length; i++) {
          if (fmt[i].match(/[d]/)) {
            seconds += Number(time[i]) * 24 * 3600;
          } else if (fmt[i].match(/[h]/)) {
            seconds += Number(time[i]) * 3600;
          } else if (fmt[i].match(/[m]/)) {
            seconds += Number(time[i]) * 60;
          } else if (fmt[i].match(/[s]/)) {
            seconds += Number(time[i]);
          }
        }
        return seconds;
      }
      return value;
    },

    _format: function(value) {
      return moment.duration(value, 'seconds').format(this.options.format, { trim: false });
    }
  });
})(jQuery);
