
class HtmlObservableSlot {

    constructor() {
      this.observers = [];
    }
    subscribe(f) {
      this.observers.push(f);
    }
    unsubscribe(f) {
      this.observers = this.observers.filter(subscriber => subscriber !== f);
    }
    update(payloads) {
      payloads.forEach((payload)=>{
        this.observers.forEach(observer => observer(payload));
      })
    }
}

export default HtmlObservableSlot;