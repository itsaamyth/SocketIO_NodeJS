let socket = io()

$('#loginBox').show()
$('#chatBox').hide()
$('#musicbox').hide()

$('#btnStart').click(() => {
  socket.emit('login', {
    username: $('#inpUsername').val(),
    password: $('#inpPassword').val(),
  })
})

socket.on('logged_in', () => {
  $('#loginBox').hide()
  $('#chatBox').show()
  $('#musicbox').show()
})

socket.on('login_failed', () => {
  window.alert('Username or Password wrong')
})

$('#btnSendMsg').click(() => {
  socket.emit('msg_send', {
    to: $('#inpToUser').val(),
    msg: $('#inpNewMsg').val()
  })
})

socket.on('msg_rcvd', (data) => {
  $('#ulMsgs').append($('<li>').text(
    `[${data.from}] : ${data.msg}`
  ))
})

function play(instId) {
  socket.emit('play', {id: instId})
}

$(function () {
  var usernameBox = $('#username')
  var loginBtn = $('#login')
  var sendBtn = $('#send');
  var msgBox = $('#message');
  var chats = $('#chats');

  socket.on('play', function (data) {
      var instrument = $('#a'+data.id)[0]
      instrument.play();
  })

})
