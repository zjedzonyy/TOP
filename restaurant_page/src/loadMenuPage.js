// creating content for the menu page

export default function loadMenuPage() {
    const content = document.getElementById('content');

    const center = document.createElement('div');
    center.id = "center";
    content.appendChild(center);


    // CSS
    const styles = 
    `#center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: rgba(0, 0, 0, 0.7);
        width: 70vw;
        height: 80%;
        min-height: 400px;
        text-align: center;
        color: rgba(245, 245, 245, 0.815);
    }`

    const styleSheet = document.createElement("style");
    styleSheet.id = "dynamicStyles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
