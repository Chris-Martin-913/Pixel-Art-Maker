let mouseButton = false;                                    // Declare Varibles
let color1;
let color2;
let eraser = false;
let hideMenuButton = false;              
let zoom;
let height;
let width;
let slider;
let zValue;

function makeGrid() {
  height = $('#input_height').val();                      // Declare height and width
	width = $('#input_width').val();                        // and width variables.
  
  while ($("#pixel_canvas").find("tr").length > 0) {        // Clear previous grids.
    $("#pixel_canvas").empty();
  }

	for (i = 0; i < height; i++) {                              // for loop adds table rows.
	   $('#pixel_canvas').append('<tr></tr>');
     for (j = 0; j < width; j++) {                            // nested inner loop adds
       $('tr').last().append('<td></td>');                    // cells to the rows.
     }
   }
}

$(document).ready(function() {                                // Allows the use of jQuery librery methods.



  $(document).contextmenu(function() {                        // Disables the Right click context menu.
    return false;                                             // This allows the right mouse button
  });                                                         // to be used for other features.
                                                              // On click event targeting the
  $("#submit").click(function(e) {
    e.preventDefault();                                       // Submit button, supresses
    makeGrid();                                               // default refresh trigger, allowing the grid to be displayed.
 
  });                                                         
  
  $('#quick_size input:radio').on("click", function() {
    switch ($(this).val()) {
    case "10": 
      $('#input_height').prop("value", "10");
      $('#input_width').prop("value", "10");
      break;
    case "20":
      $('#input_height').prop("value", "20");
      $('#input_width').prop("value", "20");
      break;
    case "30":
      $('#input_height').prop("value", "30");
      $('#input_width').prop("value", "30");
      break;
    case "40":
      $('#input_height').prop("value", "40");
      $('#input_width').prop("value", "40");
      break;
    case "50":
      $('#input_height').prop("value", "50");
      $('#input_width').prop("value", "50");
      break;
    }

  });

  $("#eraser").click(function() {                             // On click event, targeting the 
    if (eraser === false) {                                   // eraser button. Sets value to the opposite 
        eraser = true;                                        // of its current state false -> true or
        $("#eraser").prop("value", " On ");                   // true -> false. Also changes the text
    } else {                                                  // displayed on the button, either " Off "
        eraser = false;                                       // when eraser === false or " On " when
        $("#eraser").prop("value", " Off ");                  // eraser === true.
    } 
  });

  $("#pixel_canvas").on("mousedown", "td", function(e) {      // event listening for mouse button down
      mouseButton = true;                                     // Varible storing the state of mouse button. 
      if (eraser) {                                           // checks if eraser is set as true or false.
        $(this).removeProp("style");                          // if true removes style attribles thus 'erasing'
      } else {                                                // if false...
        color1 = $("#colorPicker1").val();                    // get color for left click
        color2 = $("#colorPicker2").val();                    // get color for right click
        if (e.which == 3) {                                   // checks if the right mouse button was clicked.
          $(this).css( "background-color", color2);           // Changes cell background color to color2.
        } else {                                              // if left mouse button was clicked.
         $(this).css( "background-color", color1);            // Changes cell background color to color1.
        }
      }
    }).on("mouseenter", "td", function(e) {                   // On mouse enter event for dragging or 'drawing'.
        if (mouseButton) {                                    // if the mousedown state is true (held in mouseButton)
          if (eraser) {                                       // checks if eraser is set as true or false.
            $(this).removeProp("style");                      // if true removes style attribles thus 'erasing'
          } else {                                            // if false...
            if (e.which == 3) {                               // checks if the right mouse button was clicked.
             $(this).css( "background-color", color2);        // Changes cell background color to color2.
            } else {                                          // if left mouse button was clicked.
             $(this).css( "background-color", color1);        // Changes cell background color to color1.
            }
          }
        }
      });
  
  $("html").bind("mouseup", function() {                      // detects mouseup event anywhere on the page
    mouseButton = false;                                      // so the mouse button can be released  
  });                                                         // outside of the grid.
  
  $('#hide_grid').click('#pixel_canvas',function (){          // Click event targeting the  hide_grid button.
    $('td').toggleClass('hide_grid');                         // Toggles the border attribute on and off
  });
  
  $('#toolBox input:radio').on( "click", function() {
    $(this).val() === "Drawing View" ? 
    $('.hide_menu').css('display', 'none') : 
    $('hide_menu').css('display', '');
    let message = ( $( this ).val() + " selected!" );
    $('.menu_type').prepend('<p class="view_type"></p>');
    $('.view_type').html(message);
    $('.view_type').fadeOut(2500, function() { 
      $(this).remove();
    }); 
  });

  $('#bgColorSelector').change(function() {
    let bgColor = $('#bgColorSelector').val();
    $('#pixel_canvas').css("background-color", bgColor);
  });
  zoom = $('#zoom');
  zoom.on('input', function() {
    slider = $('#zoom').val();
    zValue = $('#zValue');
    zValue.text(slider * 10); 
    $('tr').css('height', slider);
    $('td').css('width', slider);
   
  })

});