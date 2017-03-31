const assert = require('chai').assert;
const ShippingService = require('../src/shippingService');

describe('ShippingService Tests', () => {
  it('should return a number if valid params are passed', () => {
    const products = [
      { code: 'ART1', quantity: 2 },
      { code: 'ART2', quantity: 1 },
    ];
    const courier = 'DHL';
    const courierService = 'Standard';
    const destination = 'ITA';

    const shippingFees = ShippingService.getShippingFees(products, courier, courierService, destination);
    assert.equal('number', typeof shippingFees);
  });
});
