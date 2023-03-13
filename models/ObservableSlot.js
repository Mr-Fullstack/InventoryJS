
class ObservableSlot {

    constructor() {
      this.observers = [];
    }
    subscribe(f) {
      this.observers.push(f);
    }
    unsubscribe(f) {
      this.observers = this.observers.filter(subscriber => subscriber !== f);
    }
    notify(origin,data,slot) {
      this.observers.forEach(observer => observer(origin,data,slot));
    }
}

export default ObservableSlot;