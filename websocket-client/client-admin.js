let ws = new WebSocket('ws://localhost:3000')

document.addEventListener('keydown', (ev)=>{
    ws.send(JSON.stringify({
        type: 'execute',
        content: {
            key: ev.key,
            keyCode: ev.keyCode, 
            code: ev.code, 
            which: ev.which,
            shiftKey: false, 
            ctrlKey: false,  
            metaKey: false   
        }
    }))
})

/*
const template = document.createElement('template')
template.innerHTML = ''
document.body.appendChild(template.content.firstChild)
*/