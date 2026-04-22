document.addEventListener('DOMContentLoaded', () => {
    const formGasto = document.getElementById('formGasto');

    if (formGasto) {
        formGasto.addEventListener('submit', async (e) => {
            e.preventDefault(); // Detenemos el envío automático del navegador
            
            console.log("¡El botón funcionó! Empezando a guardar...");

            // 1. Capturamos los datos de los inputs del formulario
            const formData = new FormData(formGasto);
            const data = Object.fromEntries(formData.entries());
            console.log("Datos que viajan al servidor:", data);
            // 2. Convertimos el monto a número (importante para el Service)
            data.monto = Number(data.monto);

            try {
                // 3. Enviamos la petición POST a la API
                const response = await fetch('/api/gastos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('¡Gasto guardado con éxito!');
                    // 4. Redirigimos manualmente al detalle de la obra
                    // Usamos el obra_id que ya tenemos en los datos del form
                    window.location.href = `/obras/${data.obra_id}`;
                } else {
                    // Si el middleware de validación encontró un error
                    alert('Error: ' + (result.message ));
                }
            } catch (error) {
                console.error('Error al enviar el gasto:', error);
                alert('Ocurrió un error en la conexión con el servidor.');
                console.log(JSON.stringify(result));
            }
        });
    }
});