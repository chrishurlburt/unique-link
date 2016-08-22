$(document).foundation();

$(document).ready(function() {


  $('#email-form').submit(function(e){
    let data = {email: $('input[name=email]').val()}
    $.ajax({
      type        : 'POST',
      url         : '/',
      data        : data,
      dataType    : 'json',
      encode      : true
    })
    .done(function(data) {
      $('.unique-link').removeClass('hide');
      $('.link').text(window.location+data.link);
    })
      e.preventDefault();
  });


  $('#check-form').submit(function(e){
    let data = {email: $('input[name=check-email]').val()}

    console.log(data)

    $.ajax({
      type        : 'POST',
      url         : '/entries',
      data        : data,
      dataType    : 'json',
      encode      : true
    })
    .done(function(data) {
      $('.user-entries').removeClass('hide');
      $('.entries').text(data[0].entries);
    });
      e.preventDefault();
  });


});
