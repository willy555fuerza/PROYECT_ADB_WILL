
    const formAgregarUsuario = document.getElementById('myForm');
        // Agregar un controlador de eventos para el envío del formulario
        formAgregarUsuario.addEventListener("submit", async function(event) {
            event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
            console.log("Hiciste click")
    
            // Obtener los valores del formulario
            const nombres = document.getElementById('nombres').value;
            const apellidos = document.getElementById('apellidos').value;
            const perfil = document.getElementById('perfil').value;
            const usuario = document.getElementById('usuario').value;
            const foto = document.getElementById('foto').value;
            const registro = document.getElementById('registro').value;
      
            //
            console.log('Nombres:', nombres);
            console.log('Apellidos:', apellidos);
            console.log('Contraseña:', perfil);
            console.log('Usuario:', usuario);
            console.log('Perfil:', foto);
            console.log('Correo:', registro);
            
        try {
            // Enviar los datos al servidohttp://127.0.0.1:5500/front/pages/user.html
            const response = await fetch('http://127.0.0.1:5500/front/pages/user.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombres,
                    apellidos,
                    perfil,
                    usuario,
                    foto,
                    registro
                })
            });
            //console.log(response)
    
            if (response.ok) {
                alert('Usuario creado correctamente');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error al crear usuario');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al enviar la solicitud');
        }
      });