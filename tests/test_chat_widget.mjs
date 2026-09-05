import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

class Element {
    listeners = {};
    children = [];
    value = '';
    textContent = '';
    addEventListener(name, callback) { this.listeners[name] = callback; }
    append(child) { this.children.push(child); }
    focus() { this.focused = true; }
    show() { this.open = true; }
    showModal() { throw new Error('Chat must not block the page'); }
    close() { this.open = false; this.listeners.close(); }
}
const elements = new Map();
const widget = new Element();
widget.querySelector = selector => {
    if (!elements.has(selector)) elements.set(selector, new Element());
    return elements.get(selector);
};
const context = {
    document: { createElement: () => widgetCreated ? new Element() : (widgetCreated = true, widget), body: new Element() },
    AbortSignal,
};
let widgetCreated = false;
vm.runInNewContext(await readFile('chatbot.js', 'utf8'), context);
const get = id => elements.get(`#chat-${id}`);
const submit = () => get('form').listeners.submit({ preventDefault() {} });
get('open').listeners.click();
assert.equal(get('dialog').open, true);
get('close').listeners.click();
assert.equal(get('dialog').open, false);
assert.equal(get('open').focused, true);
get('open').listeners.click();
get('dialog').listeners.keydown({ key: 'Escape', preventDefault() {} });
assert.equal(get('dialog').open, false);
get('open').listeners.click();
get('input').value = '   ';
await submit();
assert.equal(get('messages').children.length, 0);
let release;
let calls = 0;
context.fetch = async (url, options) => {
    calls++;
    assert.equal(url, '/api/chatbot');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), { mensaje: '¿Qué canchas hay?' });
    await new Promise(resolve => { release = resolve; });
    return { ok: true, json: async () => ({ respuesta: '<img src=x onerror=alert(1)>' }) };
};
get('input').value = '¿Qué canchas hay?';
const sending = submit();
assert.equal(get('send').disabled, true);
await submit();
assert.equal(calls, 1);
get('input').focused = false; // Visitor moved focus to the page while waiting.
release();
await sending;
assert.equal(get('input').focused, false);
assert.equal(get('messages').children.at(-1).textContent, 'CanchaYa: <img src=x onerror=alert(1)>');
assert.equal(get('messages').children.at(-1).innerHTML, undefined);
assert.equal(get('input').value, '');
assert.equal(get('send').disabled, false);
for (const response of [
    { ok: false, json: async () => ({ error: { message: 'Quota' } }) },
    { ok: true, json: async () => ({ respuesta: '' }) },
    { ok: true, json: async () => { throw new Error('Not JSON'); } },
    null,
]) {
    context.fetch = async () => { if (!response) throw new Error('Offline'); return response; };
    get('input').value = 'Reintentar';
    await submit();
    assert.equal(get('input').value, 'Reintentar');
    assert.equal(get('send').disabled, false);
    assert.equal(get('input').readOnly, false);
    assert.match(get('status').textContent, /intentá enviarla de nuevo/);
}
for (const page of ['index.html', 'field-detail.html', 'booking.html', 'contact.html']) {
    assert.equal((await readFile(page, 'utf8')).split('src="chatbot.js"').length, 2);
}
assert.match(widget.innerHTML, /bi-chat-right/);
console.log('Chat widget checks passed');
