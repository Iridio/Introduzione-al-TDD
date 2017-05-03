couriers = [
        {
            courier: "DHL",
            weights: [
                {
                    min: 0,
                    max: 2,
                    price: 5
                },
                {
                    min: 2,
                    max: 5,
                    price: 10
                },
                {
                    min: 5,
                    max: 9999999,
                    price: 20
                }
            ],
            volumes: [
                {
                    min: 0,
                    max: 3,
                    price: 5.5
                },
                {
                    min: 3,
                    max: 7,
                    price: 8
                },
                {
                    min: 7,
                    max: 9999999,
                    price: 27
                }
            ]

        },
        {
            courier: "UPS",
            weights: [
                {
                    min: 0,
                    max: 2,
                    price: 6.5
                },
                {
                    min: 2,
                    max: 5,
                    price: 9
                },
                {
                    min: 5,
                    max: 9999999,
                    price: 21
                }
            ],
            volumes: [
                {
                    min: 0,
                    max: 3,
                    price: 6
                },
                {
                    min: 3,
                    max: 7,
                    price: 11
                },
                {
                    min: 7,
                    max: 9999999,
                    price: 30
                }
            ]

        },
        {
            courier: "FedEx",
            weights: [
                {
                    min: 0,
                    max: 2,
                    price: 7
                },
                {
                    min: 2,
                    max: 5,
                    price: 12
                },
                {
                    min: 5,
                    max: 9999999,
                    price: 24
                }
            ],
            volume:[
                {
                    min: 0,
                    max: 3,
                    price: 5
                },
                {
                    min: 3,
                    max: 7,
                    price: 10
                },
                {
                    min: 7,
                    max: 9999999,
                    price: 29
                }
            ]

        }
    ]
