// Navbar
function whiteText(x) {
  let a = x.children[0];
  a.style.color = "white";
}

function blackText(x) {
  let a = x.children[0];
  a.style.color = "white";
}

document.getElementById("cart-span").textContent = localStorage.getItem("items").split("--").length-1;


// Searchbar
let menuItems = Array.from(document.getElementsByClassName("item-menu"));
let menuItemsName = Array.from(menuItems).map(x => x.children[1].children[0].textContent);

let menus = Array.from(document.getElementsByClassName("menu"));
let menuItemsContainer = Array.from(document.getElementsByClassName("items"));
var visble = false;
let searchBar = document.getElementById("searchbar");
searchBar.addEventListener("input", (event) => {
  let allChilds = 0;
  menuItemsName.forEach(function (menuItemName, index) {
    let searchBarValue = searchBar.value;
    if (!menuItemName.includes(searchBarValue)) {
      menuItems[index].style.display = "none";
    } else {
      menuItems[index].style.display = "flex";
    }
  });

  menus.forEach(function (menu, index) {
    let childrenLength = Array.from(menuItemsContainer[index].children).filter(x => x.style.display !== "none").length;
    allChilds += childrenLength;
    if (childrenLength == 0) {
      menus[index].children[0].style.display = "none" 
    } else {
      menus[index].children[0].style.display = "block"
    }
  });
  
  if (allChilds == 0 && visble == false) {
    noChildsElementDiv = document.createElement("div");
    noChildsElement = document.createElement("span");
    noChildsElement.textContent = "لا يوجد نتائج بحث.";
    noChildsElementDiv.classList.add("noChildsDiv")
    noChildsElement.classList.add("noChilds");
    document.getElementsByTagName("section")[0].children[1].appendChild(noChildsElementDiv);
    noChildsElementDiv.appendChild(noChildsElement);
    visble = true;
  } else if (allChilds !== 0) {
    noChildsElementDiv.remove()
    noChildsElement.remove()
    visble = false;
  }
});

// Add to cart
var localStorage = window.localStorage;
var buttons = Array.from(document.getElementsByTagName("button"));
buttons.forEach(element => {
  element.addEventListener("click", (event) => {
    let text = element.parentElement.children[1].children[0].innerText;
    let price = element.parentElement.children[1].children[1].innerText;
  
    var itemsArray = localStorage.getItem("items").split("--");
    if (itemsArray.slice(1).map(x => JSON.parse(x).name).includes(text)) {
      let numberOfItems = itemsArray.slice(1).map(x => JSON.parse(x)).filter(x => x.name == text)[0].number;
      let index = itemsArray.slice(1).map(x => JSON.parse(x).name).indexOf(text)
      itemsArray[index+1] = JSON.stringify({ name: text, price: price, number: numberOfItems+1 })
    } else {
      itemsArray.push(JSON.stringify({ name: text, price: price, number: 1 }))
    }
    document.getElementById("cart-span").textContent = parseInt(document.getElementById("cart-span").textContent) + 1;
    localStorage.setItem("items", itemsArray.join("--"))
  });
});

history.scrollRestoration = "manual"

var links = document.getElementsByTagName("a");

Array.prototype.forEach.call(links, function(elem, index) {
  var elemAttr = elem.getAttribute("href");
  if(elemAttr && elemAttr.includes("#")) {
    elem.addEventListener("click", function(ev) {
      ev.preventDefault();
      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
    });
  }
});

