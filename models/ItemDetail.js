class ItemDetail {

    description;
    detail;
    header;
    body;
    title;
    subTitle
    constructor(data)
    { 
        this.header = document.createElement('header');
        this.body = document.createElement('div');
        this.description = document.createElement('div');
        this.title = document.createElement('h2');
        this.title.innerText = data.title
        this.subTitle = document.createElement('p');
        this.subTitle.innerText = data.subTitle;
        data.descriptions.map(desc => {
            let description = document.createElement("p");
            description.innerHTML = `
                <span class="${desc.value >= 1 ? 'positive': 'negative' }">
                    ${desc.value >= 1 ? '+': '-' }${Math.abs(desc.value)}% </span>${desc.label}
                </span>
            `;
            this.description.appendChild(description);
        });
        this.detail = document.createElement('div');
        this.detail.classList.add("item-detail");
        this.header.classList.add("item-detail__header");
        this.body.classList.add('item-detail__body');
        this.description.classList.add('item-detail__description');
        this.header.appendChild(this.title);
        this.header.appendChild(this.subTitle);
        this.detail.appendChild(this.header);
        this.body.appendChild(this.description);
        this.detail.appendChild(this.body);
    }
    render = () => this.detail;
}


export default ItemDetail;