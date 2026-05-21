/**
 * Función para cargar y renderizar los gastos de una obra específica
 * @param {string} obraId - El ID de la obra actual
 */
async function cargarGastos(obraId) {
    const container = document.getElementById('gastosContainer');
    const totalSpan = document.getElementById('totalGastos');

    try {
        // 1. Petición a nuestra API de gastos
        const response = await fetch(`/api/gastos?obra_id=${obraId}`);
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const todosLosGastos = await response.json();

        
        // 2. Validar si hay gastos
        if (todosLosGastos.length === 0) {
            container.innerHTML = '<p>No hay gastos registrados en esta obra.</p>';
            totalSpan.innerText = '$0';
            return;
        }

        // 3. Construir la tabla de gastos
        let acumulado = 0;
        let html = `
            <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th>Fecha</th>
                        <th>Concepto / Detalle</th>
                        <th style="text-align: center;">Cantidad</th>
                        <th style="text-align: center;">Unidad</th>
                        <th>Monto Estimado</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
        `;

        todosLosGastos.forEach(g => {
            // Sumamos al total (asegurándonos de que sea número)
            acumulado += Number(g.monto);

            // Formateamos la fecha para que sea legible
            const fechaFormateada = g.fecha ? new Date(g.fecha).toLocaleDateString() : 'S/D';

            html += `
                <tr>
                    <td>${fechaFormateada}</td>
                    <td>${g.concepto || 'Sin concepto'}</td>
                    <td style="text-align: center;">${g.cantidad || 'N/A'}</td>
                    <td style="text-align: center;">${g.unidad || 'N/A'}</td>
                    <td>$${Number(g.monto).toLocaleString()}</td>
                    <td>
                        <span style="padding: 2px 6px; border-radius: 4px; background: #eee; font-size: 0.85em;">
                            ${g.estado || 'Pendiente'}
                        </span>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        // 5. Inyectar el HTML y actualizar el total
        container.innerHTML = html;
        totalSpan.innerText = `$${acumulado.toLocaleString()}`;

    } catch (error) {
        console.error('Error al cargar gastos:', error);
        container.innerHTML = `
            <p style="color: red; border: 1px solid red; padding: 10px;">
                <strong>Error:</strong> No se pudieron cargar los gastos. Intente nuevamente más tarde.
            </p>
        `;
    }
}