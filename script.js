
// Función para realizar la solicitud GET al servidor utilizando fetch

function getDataFromServer() {
  document.getElementById("visibility").classList.remove("d-none");

  fetch('https://reqres.in/api/users?delay=3')
  

    .then(response => {
      if (!response.ok) {
        throw new Error('Error al recuperar los datos del servidor');
      }
      return response.json();
      document.getElementById("visibility").classList.add("d-none"); 

    })

    .then(data => {
      const userData = data; 

      // Guardar los datos en el local storage junto con la fecha y hora de la solicitud
      const currentTime = new Date();

      userData.timestamp = currentTime.getTime();
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log(userData.timestamp);

      // Mostrar los datos en el DOM
      displayUserData(userData);
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
}

// Función para mostrar los datos del usuario en el DOM
function displayUserData(userData) {
  document.getElementById("visibility").classList.add("d-none"); 
document.getElementById("userData").innerHTML = "";

  const userDataDiv = document.getElementById("userData");


  for ( let i = 0;  i < 6; i++ ) {
console.log(userData.data.length); 

    userDataDiv.innerHTML += `
    <table class="table">
      <tbody>
        <tr>
          <th>Nombre:</th>
          <td>${userData.data[i].first_name}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>${userData.data[i].email}</td>
        </tr>
        <tr>
          <th>Avatar:</th>
          <td><img src="${userData.data[i].avatar}" alt="Avatar" class="avatar"></td>
        </tr>
      </tbody>
    </table>
  `;

  }

}

// Función principal
function main() {
  const storedUserData = localStorage.getItem("userData");

  // Verificar si hay datos almacenados y si están dentro del tiempo límite
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    const currentTime = new Date().getTime();
    const timeDiff = (currentTime - userData.timestamp) / 1000; // Diferencia de tiempo en segundos


    if (timeDiff < 60) {
      // Los datos están dentro del tiempo límite, mostrarlos en el DOM
     
console.log("Entro a la función"); 

    
      displayUserData(userData);
      return;
    }
  }

  // Si no hay datos almacenados o han pasado más de 1 minuto, hacer una nueva solicitud al servidor
  getDataFromServer();
}

// Llamar a la función principal al cargar la página
/* main();
 */

/* document.getElementById("leerusuarios").addEventListener("click", main() );   */

