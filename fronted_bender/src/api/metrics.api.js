import axios from 'axios';

export const getMetricas = (tabla, campanaId, subcampanaId,startDate, endDate) => {
    const params = {
        tabla: tabla,
        campana: campanaId,
        subcampana: subcampanaId,
        start_date: startDate ? startDate.toISOString() : undefined,
        end_date: endDate ? endDate.toISOString() : undefined,
    };

    // Imprimir los parámetros en la consola
    console.log('Request Parameters:', params);

    // Realizar la solicitud GET
    return axios.get('http://localhost:8000/campanas/api/metricas/', {
        params: params,
    });
  
};
