(() => {
    const widget = document.createElement('div');
    widget.lang = 'es';
    widget.innerHTML = `
        <button type="button" id="chat-open" class="chat-launcher" aria-label="Abrir asistente de CanchaYa" aria-haspopup="dialog" aria-controls="chat-dialog">
            <i class="bi bi-chat-right" aria-hidden="true"></i>
        </button>
        <dialog id="chat-dialog" class="chat-dialog" aria-labelledby="chat-title">
            <div class="chat-heading">
                <h2 id="chat-title" class="h4 mb-0">Asistente de CanchaYa</h2>
                <button type="button" id="chat-close" class="btn-close btn-close-white" aria-label="Cerrar chat"></button>
            </div>
            <div id="chat-messages" class="chat-messages" role="log" aria-label="Conversación" aria-live="polite" tabindex="0">
                <p class="chat-message">Preguntame sobre las canchas, precios o cómo reservar.</p>
            </div>
            <form id="chat-form" class="chat-form">
                <p id="chat-status" class="small mb-2" role="status"></p>
                <label for="chat-input" class="form-label">Tu pregunta</label>
                <div class="d-flex gap-2">
                    <input id="chat-input" class="form-control" type="text" placeholder="¿Qué canchas hay en zona 10?" required autocomplete="off" autofocus>
                    <button id="chat-send" class="btn btn-success" type="submit">Enviar</button>
                </div>
            </form>
        </dialog>`;
    document.body.append(widget);

    const dialog = widget.querySelector('#chat-dialog');
    const input = widget.querySelector('#chat-input');
    const send = widget.querySelector('#chat-send');
    const status = widget.querySelector('#chat-status');
    const messages = widget.querySelector('#chat-messages');
    const open = widget.querySelector('#chat-open');
    let pending = false;

    open.addEventListener('click', () => dialog.showModal());
    widget.querySelector('#chat-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => open.focus());

    function addMessage(text, fromVisitor = false) {
        const message = document.createElement('p');
        message.className = `chat-message${fromVisitor ? ' chat-message-visitor' : ''}`;
        message.textContent = `${fromVisitor ? 'Vos' : 'CanchaYa'}: ${text}`;
        messages.append(message);
        messages.scrollTop = messages.scrollHeight;
    }

    widget.querySelector('#chat-form').addEventListener('submit', async event => {
        event.preventDefault();
        const mensaje = input.value.trim();
        if (pending || !mensaje) return;
        pending = true;
        send.disabled = true;
        input.readOnly = true;
        status.textContent = 'Consultando…';
        addMessage(mensaje, true);
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje }),
                signal: AbortSignal.timeout(30000),
            });
            const data = await response.json();
            if (!response.ok || typeof data.respuesta !== 'string' || !data.respuesta.trim()) {
                throw new Error('Invalid chatbot response');
            }
            addMessage(data.respuesta);
            input.value = '';
            status.textContent = '';
        } catch {
            status.textContent = 'No se pudo obtener una respuesta. Tu pregunta sigue aquí; intentá enviarla de nuevo.';
        } finally {
            pending = false;
            send.disabled = false;
            input.readOnly = false;
            if (dialog.open) input.focus();
        }
    });
})();
