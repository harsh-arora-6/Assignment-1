//javascript code
import leftDiv from "./left.js";
import rightDiv from "./right.js";
import mydata from "./data.json" assert { type: "json" };

var ptr = 0;
const norm = (label,element) => {

  //fontsize of the innerdiv
  var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
var fontSize = parseFloat(style); 
  //calculating the threshold string length
  const check = document.createElement("div");
  check.style.fontSize = fontSize + "px";
  check.style.whiteSpace = "nowrap";
  check.style.overflow = "hidden";
  check.style.width = "270px";
  document.querySelector("body").append(check);
  var str = "0";
  let threshold = 0;
  for (threshold = 1; ; threshold++) {
    check.innerText = str;
    if (check.scrollWidth > check.clientWidth) {
      break;
    }
    str += "0";
  }
  threshold--;
  check.remove();
  if (label.length < threshold) {
    return label;
  }
  var newLabel =
    label.slice(0, (threshold - 3) / 2) +
    "..." +
    label.slice(-(threshold - 3 - (threshold - 3) / 2));
  return newLabel;
};

const sz = mydata.length;
const List = leftDiv.querySelectorAll(".box");
List.forEach((item) => {
  item.querySelector(".labels").innerText = norm(item.querySelector(".labels").innerText,item);
});

List[0].focus();

// modifying for click
List.forEach((item) => {
  item.addEventListener("click", () => {
    item.focus();
    rightDiv.querySelector(".rightImg").src = item.querySelector(".leftImg").getAttribute("src");
    ptr = item.id;
    rightDiv.querySelector(".imgCaption").value = mydata[ptr].title;
  });
});

// modifying for keydown
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    --ptr;
    if (ptr < 0) {
      ptr += sz;
    }
    List[ptr].focus();
    rightDiv.querySelector(".rightImg").src = List[ptr].querySelector(".leftImg").src;
    rightDiv.querySelector(".imgCaption").value = mydata[ptr].title;
  } else if (e.code === "ArrowDown") {
    ++ptr;
    ptr %= sz;
   
    List[ptr].focus();
    rightDiv.querySelector(".rightImg").src = List[ptr].querySelector(".leftImg").src;
    rightDiv.querySelector(".imgCaption").value = mydata[ptr].title;
  }
});

// modifying for text change
rightDiv.querySelector(".imgCaption").addEventListener("input", (e) => {
  mydata[ptr].title = e.target.value;
  List[ptr].querySelector(".labels").innerText = norm(e.target.value,List[ptr]);
});
document.addEventListener("mouseenter",()=>{
  List.forEach((item) => {
    item.querySelector(".labels").innerText = norm(item.querySelector(".labels").innerText,item);
  });
})
