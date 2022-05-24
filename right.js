import mydata from "./data.json" assert { type: "json" };

const rightDiv = document.querySelector(".right");
// figure
const fig = document.createElement("figure");

fig.innerHTML = `
<img class = "rightImg" src = ${mydata[0].previewImage} alt = "img"><br>
<textarea class = "imgCaption">${mydata[0].title}</textarea>`;
rightDiv.append(fig);

export default rightDiv;