Simple socket based key presses broadcasting project

TODOs
    En flyff está enviando los eventos al server pero los clients no están recibiendo los mensajes. claramente es algo de flyff, en otras páginas funciona bien.

    - Admin (cuenta principal) envía vía socket la key press
    - Client (cuenta secundaria) constantemente hace long polling al server para recibir el key press a ejecutar