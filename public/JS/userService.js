let url2 = "http://localhost:3000/cargaUsuarios";
fetch(url2)
  .then((response) => response.json())
  .then((dataUser) => mostrarUser(dataUser))
  .catch((error) => console.log(error));

const mostrarUser = (dataUser) => {
  let body = "";
  for (i = 0; i < dataUser.length; i++) {
    body += `<tr>
      <td>${dataUser[i].id_user}</td>
        <td>${dataUser[i].name}</td>
<td>${dataUser[i].lastname}</td>
<td>${dataUser[i].username}</td>
<td>${dataUser[i].email}</td>
<td>${dataUser[i].born}</td>
<td>${dataUser[i].rol}</td>

<td class="botones-edit"><a href="/deleteUser/${dataUser[i].id_user}" class="btnBorrar"><i class="fa-solid fa-trash"></a></td>
            </tr>
         `;
  }
  document.getElementById("dataUser").innerHTML = body;
};
