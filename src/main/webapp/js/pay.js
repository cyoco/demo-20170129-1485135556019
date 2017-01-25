  $(function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: 1000,
      min: 0,
      max: 5000,
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.value );
      }
    });
    $( "#amount" ).val(  $( "#slider-range-min" ).slider( "value" ) + "円");
  });