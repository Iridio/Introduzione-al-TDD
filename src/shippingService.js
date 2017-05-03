require("./models/couriers");

module.exports = {
  getShippingFees(params) {
    if (typeof params === 'undefined') {
      return { requestValid: false, shippingFees: 0, message: 'Specificare i parametri della richiesta' };
    }
    if (typeof params.products === 'undefined' || params.products.length === 0) {
      return { requestValid: false, shippingFees: 0, message: 'Specificare l\'elenco dei prodotti' };
    }
    if (typeof params.courier === 'undefined' || params.courier === '') {
      return { requestValid: false, shippingFees: 0, message: 'Specificare il corriere' };
    }
    if (typeof params.courierService === 'undefined' || params.courierService === '') {
      return { requestValid: false, shippingFees: 0, message: 'Specificare il servizio del corriere' };
    }
    if (typeof params.destination === 'undefined' || params.destination === '') {
      return { requestValid: false, shippingFees: 0, message: 'Specificare la destinazione di spedizione' };
    }

    //1. Looking for Courier
    let courierParams = getCourier(params.courier);
    if (courierParams === undefined) {
      return { requestValid: false, shippingFees: 0, message: 'Corriere non identificato' };
    }

    // Qui implementeremo i test


    return { requestValid: true, shippingFees: shippingFees, message: '' };
  }  
};