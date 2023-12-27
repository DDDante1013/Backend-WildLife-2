let url = "http://localhost:3000/cargaProductos";
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log(error));

const mostrarData = (data) => {
  console.log(data);
  let body = "";
  for (i = 0; i < data.length; i++) {
    body += `<tr>
      <td>${data[i].id}</td>
      <td> <img class="imagen-gestor-producto" src="./Imagenes/${data[i].id}.jpg"> </td>
<td>${data[i].name}</td>
<td>${data[i].description}</td>
<td>${data[i].price}</td>
<td>${data[i].stock}</td>
<td>${data[i].id_brand}</td>
<td class="botones-edit"><a href="/update/${data[i].id}" class="btnEditar"><i class="fa-regular fa-pen-to-square"></i></a><a href="/delete/${data[i].id}" class="btnBorrar"><i class="fa-solid fa-trash"></a></td>
            </tr>
         `;
  }
  document.getElementById("data").innerHTML = body;
};
