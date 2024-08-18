// creating content for the main page
import ownerImage from './images/owner.webp';

export default function loadHomePage() {
    // HTML
    const content = document.getElementById('content');

    const center = document.createElement('div');
    center.id = "center";
    content.appendChild(center);

    const headline = document.createElement("h3");
    headline.textContent = "Where Meat Meets Mastery";
    center.appendChild(headline);

    const owner = document.createElement("div");
    owner.id = "owner";
    center.appendChild(owner);

    const description = document.createElement("p");
    description.textContent = "Smoky Ember BBQ is a rustic yet modern smokehouse that specializes in slow-smoked meats infused with rich, smoky flavors.";
    center.appendChild(description);

    // CSS
    const styles = 
        `#center {
            min-width: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 100vw;
            background-color: rgba(0, 0, 0, 0.7);
            width: 600px;
            height: 80%;
            min-height: 400px;
            text-align: center;
            color: rgba(245, 245, 245, 0.815);
        }
        #owner {
            height: 60%;
            width: 60%;
            background-image: url(${ownerImage});
            background-position: center;
            background-repeat: no-repeat; 
            background-size: cover; 
            opacity: 1;
            border-radius: 50%;
        }`;
        
    const styleSheet = document.createElement("style");
    styleSheet.id = "dynamicStyles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
