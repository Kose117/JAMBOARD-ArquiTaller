export type Listener = () => void;

export class SimpleEventEmitter {
    private listeners: Listener[] = [];

    on(fn: Listener) {
        this.listeners.push(fn);
    }

    off(fn: Listener) {
        this.listeners = this.listeners.filter(l => l !== fn);
    }

    emit() {
        for (const fn of this.listeners) {
            try { fn(); } catch { }
        }
    }
}
