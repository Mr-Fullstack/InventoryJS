class State {

    constructor(state) 
    {
      this.data = state;
    }

    getDataValueOf(container)
    {
      return Object.values(this.data[container])
    }
    
    getDataSlotValueOf(key)
    {
      let [container,slot] = key.split('>').map(value=> value.trim());

      if (this.data[container][slot])
      {
        return this.data[container][slot]
      }
      return false
    }

    update(payload) 
    {
      const { data, key } = payload;

      const [ container, slot ] = key.split('>').map(value=> value.trim());
  
      if(data){
        this.data[container][slot] = { ...this.data[container][slot],...data };
      }
      else
      {
        this.data[container][slot] = {};
      }

      if (this.data[container][slot])
      {
        return this.data[container][slot]
      }

      return false
    }

    updateForEach(payloads) 
    {
      payloads.forEach(payload=>{
        this.update(payload)
      })
    }
}

export default State;