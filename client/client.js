let ws = new WebSocket('ws://localhost:3000')

ws.addEventListener('message', (event) => {
    console.log('mensaje:', event)
    let packet = JSON.parse(event.data);
    switch(packet.type){
        case 'log':
            console.log(packet.content)
            break;
        case 'execute':
            let keyboardEventArgs = packet.content
            console.log('data content:', packet.content)
            const ev = new KeyboardEvent('keydown', keyboardEventArgs)
            document./*querySelector("#canvas").*/dispatchEvent(ev)
            break;
    }
})
ws.addEventListener('open', ()=>{
    ws.send(JSON.stringify({type: 'register-client'}))
})

/*
const template = document.createElement('template')
template.innerHTML = ''
document.body.appendChild(template.content.firstChild)
*/