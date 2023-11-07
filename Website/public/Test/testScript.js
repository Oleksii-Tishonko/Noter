let header = document.querySelector("#header");
getDataFromServer(header);

async function getDataFromServer(header){
    let url = "http://localhost:3050/api/v1/test";
    let responce = await fetch(url) ;

    let dataString = await responce.json();

    let data = dataString.data;

    header.textContent = data;
}
