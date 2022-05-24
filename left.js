import mydata from "./data.json" assert { type: "json" };

var ptr = 0;
const leftDiv = document.querySelector(".left");
mydata.forEach((item) => {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", ptr++);
    newDiv.classList.add("box");
    newDiv.setAttribute("tabindex",-1);
    // newDiv.classList.add("ellipsis");
    newDiv.innerHTML = `
      <img class = "leftImg" src = ${item.previewImage}>
      <span class = "labels">${item.title}</span>
      `;
    leftDiv.append(newDiv);
  });

export default leftDiv;