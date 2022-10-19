(function () {
    const server = 'http://127.0.0.1:3000'
    const socket = io(server);

    let sendMessage = document.getElementById('send');
    let chat = document.getElementById('chat');

    sendMessage.addEventListener('click',function(e) {
        e.preventDefault();
        let message = document.getElementById('messageId').value;
        
        socket.emit('chat',{
            data:message
        })
    })

    socket.on('chat',function(mess){

        let html = document.createElement('li');
        html.innerHTML = `<li class="me"><div class="name"><span class="">John Doe</span></div><div class="message"><p>${mess}</p><span class="msg-time">5:00 pm</span></div>`;
        chat.appendChild(html);
        
    })

    socket.on('notification', (data) => {
        console.log('Message depuis le seveur:', data);
    })

    fetch(`${server}/test`).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
    })
})()