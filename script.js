//javascript code
import mydata from "./data.json" assert { type: "json" };

const main = document.querySelector("main");

var ptr = 0;
const norm = (str) => {
  if (str.length <= 30) {
    return str;
  } else {
    let newStr = str.slice(0, 14) + "..." + str.slice(-14);
    return newStr;
  }
};

mydata.forEach((item) => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", ptr++);
  newDiv.classList.add("box");
  // newDiv.classList.add("ellipsis");
  newDiv.innerHTML = `
    <img class = "divImg" src = ${item.previewImage}>
    <span>${norm(item.title)}</span>
    `;
  main.querySelector(".container").append(newDiv);
});

ptr = 0;
const sz = mydata.length;
const List = document.querySelectorAll("main .container div");
List[0].style.backgroundColor = "blue";
List[0].style.color = "white";

const fig = document.createElement("figure");
fig.innerHTML = `
<img class = "actImg" src = ${mydata[0].previewImage} alt = "img"><br>`;
main.append(fig);

const figname = document.createElement("textarea");
figname.value = mydata[0].title;
fig.append(figname);

// modifying for click
List.forEach((item) => {
  item.addEventListener("click", () => {
    List.forEach((curitem) => {
      curitem.style.backgroundColor = "";
      curitem.style.color = "black";
    });
    item.style.backgroundColor = "blue";
    item.style.color = "white";
    fig.querySelector("img").src = item.querySelector("img").src;
    ptr = item.id;
    figname.value = mydata[ptr].title;
  });
});

// modifying for keydown
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    --ptr;
    if (ptr < 0) {
      ptr += sz;
    }
    List.forEach((curitem) => {
      curitem.style.backgroundColor = "";
      curitem.style.color = "black";
    });
    List[ptr].style.backgroundColor = "blue";
    List[ptr].style.color = "white";
    fig.querySelector("img").src = List[ptr].querySelector("img").src;
    figname.value = mydata[ptr].title;
  } else if (e.code === "ArrowDown") {
    ++ptr;
    ptr %= sz;
    List.forEach((curitem) => {
      curitem.style.backgroundColor = "";
      curitem.style.color = "black";
    });
    List[ptr].style.backgroundColor = "blue";
    List[ptr].style.color = "white";
    fig.querySelector("img").src = List[ptr].querySelector("img").src;
    figname.value = mydata[ptr].title;
  }
});

// modifying for text change
figname.addEventListener("input", (e) => {
  mydata[ptr].title = norm(e.target.value);
  List[ptr].querySelector("span").innerText = norm(e.target.value);
  console.log(figname);
});
