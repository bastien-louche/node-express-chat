const sMessage = require('../models/message');
module.exports = function (io) {

  io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    io.emit('notification', { type: 'new_user', data: socket.id });

    // Listener sur la déconnexion
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit('notification', { type: 'removed_user', data: socket.id });
    });

    socket.on('...', (msg) => {

    });

    socket.on('chat', (message) => {
      console.log(`Jai recu : ${message.data}` );
      const mess = message.data;
      const m = new sMessage({
        text : message.data,
        idUser: 1
      })

      m.save().then(() => {
        sMessage.count({}, function(err, message){
            console.log( "message:: ", message );
            io.emit('plus-one', io.emit('chat', mess))
        });
    }).catch((error) => {
        console.log(error)
    })
  });
})
  
}