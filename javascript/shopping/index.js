const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener('click', () => {
    const currentValue = input.value;
    input.value = "";

    const li = document.createElement("li");
    const span = document.createElement('span');
    const btn = document.createElement('button');

    li.appendChild(span);
    span.textContent = currentValue;
    li.appendChild(btn);
    btn.textContent = "Delete";
    list.appendChild(li);

    btn.addEventListener('click', () => {
        list.removeChild(li);
    })

    input.focus();
});