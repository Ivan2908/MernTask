import { MOSTRAR_ALERTA, LIMPIAR_ALERTA } from '../../types';

export default (state,action ) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                alerta: null
            }    
        default: 
            return state;
    }
}