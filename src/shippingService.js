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
    let courierParams = getCourierInfo(params.courier);
    if (courierParams === undefined) {
      return { requestValid: false, shippingFees: 0, message: 'Corriere non identificato' };
    }

    //2. Compute StandardShippingFees
    let shippingFees = getStandardShippingFees(params.products, courierParams.weights, courierParams.volumes);

    return { requestValid: true, shippingFees: shippingFees, message: '' };
  }  
};

function getCourierInfo(courier) {
  for (let i = 0; i < couriers.length; i++) {
    if (couriers[i].courier === courier)
      return couriers[i];
  }

  return undefined;
}

function getStandardShippingFees(products, weights, volumes) {
  let shippingFees = 0;
  let totalWeight = 0;
  let totalVolumePerMeter = 0;

  //#region Compute totalWeight && totalVolumePerMeter
  for (let i = 0; i < products.length; i++) {
    totalWeight += ( products[i].weight * products[i].quantity);
    let volumePerMeter = (products[i].volume * products[i].quantity ) / 5000000;
    totalVolumePerMeter += volumePerMeter;
  }
  //#endregion

  //#region PrezzoPerVolume
  let volumeFees = 0;
  for (let v = 0; v < volumes.length; v++) {
    if (totalVolumePerMeter >= volumes[v].min && volumes[v].max <= totalVolumePerMeter) {
      volumeFees = volumes[v].price;
    }
  } 
  //#endregion
  
  //# region PrezzoPerPeso
  let weightFees = 0;
  for (let p = 0; p < weights.length; p++) {
    if (totalWeight >= weights[p].min && weights[p].max <= totalWeight) {
      weightFees = weights[p].price;
    }
  }
  //#endregion    

  //#region Compare Fees
  if (weightFees > volumeFees) {
    shippingFees += weightFees;
  } else {
    shippingFees += volumeFees;
  }
  //#endregion

  return shippingFees;
}

function chkFreeShipping(shippingFees, products) {
  let totalValue = 0;

  //#region Compute totalWeight && totalVolumePerMeter
  for (let i = 0; i < products.length; i++) {
    totalValue += (products[i].pricePerUnit * products[i].quantity);
  }
  //#endregion

  //#region ChkSpedizioneGratuita
  if (totalValue >= 100) {
    shippingFees = 0;
  }
  //#endregion

  return shippingFees;
}

function addServiceCost(shippingFees, courierService) {
    if (courierService === 'Express') {
        shippingFees += (shippingFees * 30 / 100);
    }

    return shippingFees;
}

// Possibile refactor: Aggiungere sconti/maggiorazioni sulla destinazione
// in couriers.
function addDestinationCost(shippingFees, courier, destination) {
    if (courier === 'DHL' && destination === 'BRA') {
        shippingFees -= (shippingFees * 2/100);
    }

    if (courier === 'UPS' && destination === 'ITA') {
        shippingFees += 3;
    }

    return shippingFees;
}