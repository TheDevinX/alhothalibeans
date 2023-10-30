if (localStorage.items.split("--").length-1 == 0) {
  document.getElementsByClassName("col-10")[0].innerHTML += `<div class="d-flex justify-content-between align-items-center mb-4 fs-4">لا يوجد أغراض</div>`
}

localStorage.items.split("--").slice(1).forEach(function (element, index) {
  console.log(element)
  elementJSON = JSON.parse(element)
  if (Array.from(document.getElementsByClassName("lead fw-normal mb-1 fs-3")).map(x => x.textContent).includes(elementJSON.name)) {
    let textIndex = Array.from(document.getElementsByClassName("lead fw-normal mb-1 fs-3")).map(x => x.textContent).indexOf(elementJSON.name)
    console.log(Array.from(document.getElementsByClassName("form-control form-control-sm"))[textIndex])
    Array.from(document.getElementsByClassName("form-control form-control-sm"))[textIndex].value = "12";
  } else {
    document.getElementsByClassName("col-10")[0].innerHTML += `  
    <div class="card rounded-3 mb-4">
    <div class="card-body p-4">
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="images/menu/${elementJSON.name}.png"
            class="img-fluid rounded-3" alt="${elementJSON.name}">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <p class="lead fw-normal mb-1 fs-3">${elementJSON.name}</p>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button class="btn btn-link px-2"
            onclick="">
            <i class="fas fa-minus"></i>
          </button>

          <input id="form1" min="1" name="quantity" disabled value="${elementJSON.number}" type="number"
            class="form-control form-control-sm" />

          <button class="btn btn-link px-2"
            onclick="">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 class="mb-0">${parseFloat(elementJSON.price)*parseInt(elementJSON.number)} ر.س</h5>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
        </div>
      </div>
    </div>
    </div>`
  }
  if (index == localStorage.items.split("--").slice(1).length-1 && localStorage.items.split("--").length-1 !== 0) {
      document.getElementsByClassName("col-10")[0].innerHTML += `<div class="card mb-5">
      <div class="card-body p-4">

        <div class="float-start">
          <button type="button" style="color: white;" class="btn btn-warning btn-block btn-lg">الذهاب إلى الدفع</button>
        </div>

        <div class="float-end">
          <p class="p-2 fs-4">
            <span class="small text-muted me-2">الإجمالي:</span> 
            <span class="lead fw-normal">${localStorage.items.split("--").slice(1).map(x => parseFloat(JSON.parse(x).price) * parseInt(JSON.parse(x).number) ).reduce((a, b) => a + b, 0)} ر.س</span>
          </p>
        </div>

      </div>
    </div>`
    }
  if (localStorage.items.split("--").length-1 == 0) {
    document.getElementsByClassName("col-10")[0].innerHTML += `<div class="d-flex justify-content-between align-items-center mb-4">لا يوجد أغراض</div>`
  }
});

let buttons = Array.from(document.getElementsByClassName("btn btn-link px-2"));
buttons.forEach(element => {
  element.addEventListener("click", (event) => {
    let itemName = element.parentElement.parentElement.children[1].children[0].textContent
    let price = element.parentElement.parentElement.getElementsByClassName("mb-0")[0].textContent;
    let plusOrNot = element.children[0].className.includes("plus");
    let number = parseInt(element.parentElement.querySelector('input[type=number]').value);
    let itemsArray = localStorage.getItem("items").split("--");
    let index = itemsArray.slice(1).map(x => JSON.parse(x).name).indexOf(itemName)
    if (plusOrNot) {
      element.parentElement.parentElement.getElementsByClassName("mb-0")[0].textContent = (parseFloat(price) + (parseFloat(price) / number - 1))+1 + " ر.س"
      itemsArray[index+1] = JSON.stringify({ name: itemName, price: (parseFloat(price) / number), number: number+1 })
    } else if (!plusOrNot && number !== 1) {
      element.parentElement.parentElement.getElementsByClassName("mb-0")[0].textContent = (parseFloat(price) - (parseFloat(price) / number)) + " ر.س";
      itemsArray[index+1] = JSON.stringify({ name: itemName, price: (parseFloat(price) / number), number: number-1 })
    }
    plusOrNot ? element.parentElement.querySelector('input[type=number]').stepUp() : element.parentElement.querySelector('input[type=number]').stepDown();
    localStorage.setItem("items", itemsArray.join("--"));
    document.getElementsByClassName("p-2 fs-4")[0].children[1].textContent = localStorage.items.split("--").slice(1).map(x => parseFloat(JSON.parse(x).price) * parseInt(JSON.parse(x).number) ).reduce((a, b) => a + b, 0) + " ر.س"
  });
});

let destroyButtons = Array.from(document.getElementsByClassName("text-danger"));
destroyButtons.forEach(element => {
  element.addEventListener("click", (event) => {
    let itemName = element.parentElement.parentElement.children[1].children[0].textContent;
    element.parentElement.parentElement.parentElement.parentElement.remove()
    if (localStorage.items.split("--").slice(1).length == 1) {
      localStorage.items = "";
      document.getElementsByClassName("col-10")[0].innerHTML += `<div class="d-flex justify-content-between align-items-center mb-4 fs-4">لا يوجد أغراض</div>`
      document.getElementsByClassName("p-2 fs-4")[0].parentElement.parentElement.parentElement.remove()
    } else {
      localStorage.items = "--" + localStorage.items.split("--").slice(1).map(x => JSON.parse(x)).filter(x => x.name !== itemName).map(x => JSON.stringify(x)).join("--")
      document.getElementsByClassName("p-2 fs-4")[0].children[1].textContent = localStorage.items.split("--").slice(1).map(x => parseFloat(JSON.parse(x).price) * parseInt(JSON.parse(x).number) ).reduce((a, b) => a + b, 0) + " ر.س"
    }
  });
});
// document.getElementsByClassName("col-10")[0].innerHTML += `<div class="card">
// <div class="card-body">
//   <button type="button" class="btn btn-warning btn-block btn-lg">الذهاب إلى الدفع</button>
// </div>
// </div>`