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

export const getPeriodos = (tabla, subcampanaId) => {
    const params = {
        tabla: tabla,
        subcampana: subcampanaId
    };

    console.log('Request Parameters for Periodos:', params);

    return axios.get('http://localhost:8000/campanas/api/metricas/periodo/', {
        params: params,
    });
};