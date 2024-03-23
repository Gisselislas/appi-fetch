console.log("Api Fetch");
//esta función nos trae el formato Json lo convertimos a objeto y lo almacenamos en string //
const getUsersUsingAsyncAwait = async ( url ) =>{

    const resolve = await fetch( url );
    const users = await resolve.json(); // convertir de JSON a Object
    console.log( users );
    const userDataJson = JSON.stringify(users);
    localStorage.setItem("user data",userDataJson);
}
getUsersUsingAsyncAwait("https://reqres.in/api/users?delay=3");


const generateCards= ( users ) => {
                  
return users.map( user => `    
<div class="col-12 col-md-4 mb-4">
<div class="card" >
  <div class="card-body">
  <h5 class="card-title">${ user.first_name}</h5>
  <h6 class="card-subtitle mb-2 text-body-secondary">${ user.email}</h6>
  <img src= ${user.avatar} class=" img-fluid rounded-circle">
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
 </div>
</div>
`  );
}
const printCards = ( cards ) => document.getElementById("user-cards").innerHTML= cards.join("");
 
const getUsers = async(url) =>{
    const resolve = await fetch( url );
    const requestData = await resolve.json();
    const users = requestData.data; // Obtener el arreglo de usuarios
    // user = [ {email="",...} , {}, {}  ]
    printCards(  generateCards( users ) );
}

const handleButton = () =>{
    // evaluaciones diversas
    // getUsers("https://reqres.in/api/users?page=1");
    getUsers("https://reqres.in/api/users?delay=3");
}

const postUser = async ( newUser ) => {
    // TODO enviar datos al servidor

    const url = "https://reqres.in/api/users?delay=3";
    const options = {
        method: "POST", // POST, PUT, DELETE, GET
        header: { "Content-Type":"application/json" },
        body:  JSON.stringify( newUser ) // conversión de Object a JSON
    }

    const response = await fetch( url, options  );
    console.log( response )
    if (response.status === 201){
        const userCreated = await response.json();
        console.log( userCreated)
        alert("Usuario creado con éxito el " + userCreated.createdAt);
        localStorage.setItem("userData", JSON.stringify( newUser ) ); // guardar nuevo dato en local storage
        localStorage.setItem("fechaAlmacenamiento", new Date().toLocaleTimeString() );
       
    }
}
  