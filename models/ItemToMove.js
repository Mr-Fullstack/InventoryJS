class ItemToMove {

    img;
    quantity;
    figure;
    item;
    constructor(data)
    {
        this.item= document.createElement('div');
        this.item.classList.add('slot-preview');
        this.quantity= document.createElement('span');
        this.img = document.createElement('img');
        this.figure = document.createElement('figure')
        this.quantity.classList.add('slot-preview-quantity');
        this.quantity.innerText = data.quantity;
        this.img.src = data.src;
        this.figure.appendChild(this.img);
        this.figure.appendChild(this.quantity);
        this.item.appendChild(this.figure);
    }

    render = ()=> this.item;

}  

export default ItemToMove;