// creating content for the menu page

// create menu
const dishes = [
    { name: 'Smoked Brisket', description: 'Tender and juicy beef brisket slow-smoked to perfection.', price: '$18.99', image: 'brisket.webp' },
    { name: 'Pulled Pork', description: 'Savory pulled pork with a smoky flavor and a tangy BBQ sauce.', price: '$14.99', image: 'pulled_pork.webp' },
    { name: 'BBQ Ribs', description: 'Fall-off-the-bone pork ribs with our signature dry rub.', price: '$19.99', image: 'ribs.webp' },
    { name: 'Grilled Chicken', description: 'Juicy grilled chicken breasts with a smoky marinade.', price: '$15.99', image: 'chicken.webp' },
    { name: 'Smoked Sausage', description: 'Flavorful smoked sausages served with a side of mustard.', price: '$12.99', image: 'sausage.webp' },
    { name: 'Beef Short Ribs', description: 'Rich and tender beef short ribs, slow-cooked to perfection.', price: '$22.99', image: 'short_ribs.webp' },
    { name: 'Pulled Chicken Sandwich', description: 'Smoky pulled chicken served on a fresh bun.', price: '$13.99', image: 'chicken_sandwich.webp' },
    { name: 'BBQ Wings', description: 'Spicy and smoky chicken wings, served with ranch dressing.', price: '$11.99', image: 'wings.webp' },
    { name: 'Smoked Turkey', description: 'Juicy smoked turkey with a rich, smoky flavor.', price: '$17.99', image: 'turkey.webp' },
    { name: 'Brisket Sandwich', description: 'Tender smoked brisket served on a bun with BBQ sauce.', price: '$16.99', image: 'brisket_sandwich.webp' },
    { name: 'BBQ Platter', description: 'A platter of all our smoked meats, served with sides.', price: '$25.99', image: 'bbq_platter.webp' },
    { name: 'Smoked Salmon', description: 'Delicious smoked salmon with a hint of lemon.', price: '$21.99', image: 'salmon.webp' }
];

const imageNames = [
    'brisket.webp',
    'pulled_pork.webp',
    'ribs.webp',
    'chicken.webp',
    'sausage.webp',
    'short_ribs.webp',
    'chicken_sandwich.webp',
    'wings.webp',
    'turkey.webp',
    'brisket_sandwich.webp',
    'bbq_platter.webp',
    'salmon.webp',
  ];
  
const images = imageNames.map(name => require(`./images/${name}`));
  
// create page
export default function loadMenuPage() {
    const content = document.getElementById('content');

    const center = document.createElement('div');
    center.id = "center";
    content.appendChild(center);

    dishes.forEach((dish, index) => {
        const item = document.createElement('div');
        item.className = 'item';

        const img = document.createElement('img');
        img.src = images[index];
        img.alt = dish.name;

        const title = document.createElement('h3');
        title.textContent = dish.name;

        const desc = document.createElement('p');
        desc.textContent = dish.description;

        const price = document.createElement('p');
        price.textContent = dish.price;
        price.className = 'price';

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(desc);
        item.appendChild(price);

        item.id = `item-${index + 1}`;

        center.appendChild(item);
    });

    // CSS
    const styles = 
    `#center {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        justify-content: space-around;
        grid-auto-flow: row;
        background-color: rgba(0, 0, 0, 0.7);
        width: 70vw;
        height: 95%;
        min-height: 400px;
        text-align: center;
        color: rgba(245, 245, 245, 0.815);
        overflow: auto;
    }
     .item {
        background-color: rgba(0, 0, 0, 0.5);
        width: 350px;
        height: 350px;
        margin: 30px;
     }
     .item img {
        width: 200px;
        height: 200px;
     }
    `

    const styleSheet = document.createElement("style");
    styleSheet.id = "dynamicStyles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
