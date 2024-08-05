import axios from 'axios';

export const getPeriods = (tabla) => {
    const params = { tabla };
    return axios.get('http://localhost:8000/campanas/api/periodos/', { params });
};

export const getDayMetrics = (tabla, subcampanaId, periodo) => {
    const params = {
        tabla: tabla,
        subcampana_id: subcampanaId,
        periodo: periodo
    };

    console.log('Request Parameters for Day Metrics:', params);

    return axios.get('http://localhost:8000/campanas/api/metricas/day/', {
        params: params,
    });
};