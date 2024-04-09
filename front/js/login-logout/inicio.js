const users = document;

const paginaUsers = users.querySelector('#usuarios')

const Users = ({id_usuario, nombres, apellidos, perfil, usuario, foto, fecha_registro, ultimo_login, estado}) => {
    // Convertir la fecha de registro a un formato de año-mes-día
    const formattedDate = new Date(fecha_registro).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const buttonColor = estado === true ? 'green' : 'red';
    const buttontxt = estado === true ? 'SI' : 'NO';

    return `
        <tr id="user-row-${id_usuario}"> <!-- Agregar un ID único para la fila -->
            <td>${id_usuario}</td>
            <td>${nombres}</td>
            <td>${apellidos}</td>
            <td>${perfil}</td>
            <td>${usuario}</td>
            <td>${foto}</td>
            <td>${formattedDate}</td>
            <td>${ultimo_login}</td>
            <td>
            <div class="container-btn-state">
                <button class="btn-state" style="background-color: ${buttonColor}" >${buttontxt}</button>
            </div>
            </td>
            <td>
                <div class="button-eliminar-editar">
                    <button class="editar" onclick="editUser(${id_usuario})"><i class="fi fi-rr-pen-field"></i></button> <!-- Llamar a la función editUser -->
                    <button class="estado" onclick="changeState(${id_usuario}, ${estado})"><i class="fi fi-sr-cross-small"></i></button>
                </div>
            </td>
        </tr>
                
    `
}

// Función para editar un usuario
const editUser = (id_usuario) => {
    const row = document.getElementById(`user-row-${id_usuario}`);
    const cells = row.getElementsByTagName('td');

    for (let i = 1; i < cells.length - 1; i++) {
        const cell = cells[i];
        const oldValue = cell.innerText.trim();
        cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" style="width: 100%; ">`;
    }

    const editButton = cells[cells.length - 1].getElementsByTagName('button')[0];
    editButton.innerHTML = '<i class="fi fi-rr-check"></i>';
    editButton.setAttribute('onclick', `saveChanges(${id_usuario})`);
}

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_usuario) => {
    const row = document.getElementById(`user-row-${id_usuario}`);
    const cells = row.getElementsByTagName('td');
    const newValues = [];

    for (let i = 1; i < cells.length - 1; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName('input')[0].value;
        newValues.push(newValue);
    }

    try {
        const response = await fetch(`http://localhost:3009/ADB/Users/${id_usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombres: newValues[0],
                apellidos: newValues[1],
                perfil: newValues[2],
                usuario: newValues[3],
                foto: newValues[4],
                fecha_registro: newValues[5],
                ultimo_login: newValues[6]
            })
        });
        
        if (response.status !== 200) throw new Error('Error al actualizar el usuario');
        
        alert('Usuario actualizado correctamente');
        getAll();
    } catch (error) {
        alert('Error ' + error);
    }
}


const render = (array)=>{
    //const filteredUsers = array.filter(user => user.estado === 1); // Filtrar usuarios con state igual a 1
    const cardsHTML = array.map(item => Users(item)).join('');
    paginaUsers.innerHTML = cardsHTML;
}

const getAll = async ()=>{
    try {
        const response = await fetch('http://localhost:3009/ADB/Users')
        if (response.status !== 200) throw new Error('Error en la solicitud')
        const data = await response.json()
        render(data)
    } catch (error) {
        alert('Error ' + error)
    }
}

// CAmbiar state del usaurio (deshabilitacion logica)
const changeState = async (userId, currentState) => {
    try {
        let newState = 1;
        if (currentState == 1) {
            newState = 0;
        }
        const response = await fetch(`http://localhost:3009/ADB/Users/${userId}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state: newState }) // Cambiar el estado a 0
        });
        if (response.status !== 200) throw new Error('Error al cambiar el estado del usuario');
        // Actualizar la tabla después de cambiar el estado
        getAll();
    } catch (error) {
        alert('Error ' + error);
    }
}




getAll()