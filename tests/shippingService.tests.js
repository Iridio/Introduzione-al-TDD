const expect = require('chai').expect;
const ShippingService = require('../src/shippingService');

describe('ShippingService Tests', () => {
  it('should returns false if no parameters are passed', () => {
    const result = ShippingService.getShippingFees();
    expect(result).to.have.property('requestValid', false);
    expect(result).to.have.property('shippingFees', 0);
    expect(result).to.have.property('message', 'Specificare i parametri della richiesta');
  });

  it('should returns false if products are not valid', () => {
    const params = {};
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', false);
    expect(result).to.have.property('shippingFees', 0);
    expect(result).to.have.property('message', 'Specificare l\'elenco dei prodotti');
  });

  it('should returns false if courier is empty', () => {
    const params = {
      products: [
        { code: 'ART1', quantity: 2, pricePerUnit: 34.5, volume: 6000000, weight: 250 },
        { code: 'ART2', quantity: 1, pricePerUnit: 89.90, volume: 40000000, weight: 450 },
      ],
    };
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', false);
    expect(result).to.have.property('shippingFees', 0);
    expect(result).to.have.property('message', 'Specificare il corriere');
  });

  it('should returns false if courierService is empty', () => {
    const params = {
      products: [
        { code: 'ART1', quantity: 2, pricePerUnit: 34.5, volume: 6000000, weight: 250 },
        { code: 'ART2', quantity: 1, pricePerUnit: 89.90, volume: 40000000, weight: 450 },
      ],
      courier: 'DHL',
    };
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', false);
    expect(result).to.have.property('shippingFees', 0);
    expect(result).to.have.property('message', 'Specificare il servizio del corriere');
  });

  it('should returns false if destination is empty', () => {
    const params = {
      products: [
        { code: 'ART1', quantity: 2, pricePerUnit: 34.5, volume: 6000000, weight: 250 },
        { code: 'ART2', quantity: 1, pricePerUnit: 89.90, volume: 40000000, weight: 450 },
      ],
      courier: 'DHL',
      courierService: 'Standard',
    };
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', false);
    expect(result).to.have.property('shippingFees', 0);
    expect(result).to.have.property('message', 'Specificare la destinazione di spedizione');
  });

  it('should returns correct cost with valid params passed', () => {
    const params = {
      products: [
        { code: 'ART1', quantity: 2, pricePerUnit: 34.5, volume: 6000000, weight: 250 },
        { code: 'ART2', quantity: 1, pricePerUnit: 89.90, volume: 40000000, weight: 450 },
      ],
      courier: 'DHL',
      courierService: 'Standard',
      destination: 'ITA',
    };
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', true);
    expect(result).to.have.property('shippingFees', 0.0);
    expect(result).to.have.property('message').to.be.empty;
  });

it('should returns correct cost with other valid params passed', () => {
    const params = {
      products: [
        { code: 'ART1', quantity: 1, pricePerUnit: 34.5, volume: 4000000, weight: 200 },
        { code: 'ART2', quantity: 1, pricePerUnit: 20.90, volume: 25000000, weight: 120 },
      ],
      courier: 'DHL',
      courierService: 'Standard',
      destination: 'ITA',
    };
    const result = ShippingService.getShippingFees(params);
    expect(result).to.have.property('requestValid', true);
    expect(result).to.have.property('shippingFees', 10.0);
    expect(result).to.have.property('message').to.be.empty;
  });

});
