const hely = "https://surveys-5jvt.onrender.com/api/cars/"


function Tabla(element){
    const table = document.getElementById("table")
                const cardDiv = document.createElement('li')
                cardDiv.classList.add("col-12")
                cardDiv.classList.add("card")
                const cardheadDiv = document.createElement('div')
                cardheadDiv.classList.add("card-header")

                cardheadDiv.innerHTML = `<h1><a href="#" onclick="Popuppp('${element.id}')">${element.model}</a></h1>`
                
                const delet = document.createElement('button')
                delet.addEventListener("click", ()=>{
                    Del(element.id)
                    table.removeChild(cardDiv)
                })
                delet.classList.add("card-body")
                delet.classList.add("bg-danger")
                delet.innerHTML = "Töröl"

                const change = document.createElement('button')
                change.addEventListener("click", ()=>{
                    location.href = `update.html?id=${element.id}`
                })
                change.classList.add("card-body")
                change.classList.add("bg-light")
                change.innerHTML = "Módosít"
                
                cardDiv.appendChild(cardheadDiv)
                cardDiv.appendChild(change)
                cardDiv.appendChild(delet)
                table.appendChild(cardDiv)
}

function TablaBetolt(){
    fetch(hely)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            console.log(response)
            return response.json();
        })
        .then(cars => {
            console.log(cars)
            cars.forEach(element => {
                Tabla(element)
            });

        })
        .catch(error => {
            console.error(error)
        })
}

function AutoFeltolt(mod, ev, marka){
    fetch(hely,{
        method: "POST",
        body: JSON.stringify({
            model: mod,
            brand: marka,
            year: ev
        }),
        headers: {
            "Content-type":"application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(element => {
        Tabla(element)
    })
    .catch(error => console.error(error))
}

function Del(id_num){
    fetch(`${hely}${id_num}`, {
        method: "DELETE"
    })
    .catch(error => console.error(error))
}

function Update()
{
const urlParams = new URLSearchParams(window.location.search);
const current_id = urlParams.get('id')
fetch(`${hely}${current_id}`)
.then(response => response.json())
.then(element => {
    console.log(current_id)
    document.getElementById("model").value = element.model
    document.getElementById("brand").value = element.brand
    document.getElementById("year").value = element.year
    document.getElementById("feltoltes").addEventListener("click", ()=>{
        fetch(`${hely}${current_id}`,{
            method: "PUT",
            body: JSON.stringify({
                model: document.getElementById("model").value,
                brand: document.getElementById("brand").value,
                year: document.getElementById("year").value
            }),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(element => {
            console.log(element)
            location.href = `index.html`
        })
        .catch(error => console.error(error))
    })
}
)
}

function Popuppp(id_num){
fetch(`${hely}${id_num}`)
.then(response => response.json())
.then(element => {
    alert(`Model: ${element.model}\nBrand: ${element.brand}\nYear: ${element.year}`)
})
.catch(error => console.error(error))

}