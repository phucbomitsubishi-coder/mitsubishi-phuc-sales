export type PromotionBenefit = {
  label: string;
  value?: number;
  description?: string;
  calculable: boolean;
};

export type VariantPromotion = {
  variantName: string;
  modelYear?: string;
  retailPrice?: number;
  benefits: PromotionBenefit[];
};

export type CarPromotion = {
  carId: string;
  variants: VariantPromotion[];
};

export type PromotionProgram = {
  month: number;
  year: number;
  title: string;
  source: string;
  cars: CarPromotion[];
};

export const currentPromotion: PromotionProgram = {
  "month": 10,
  "year": 2026,
  "title": "CHƯƠNG TRÌNH KHUYẾN MÃI MUA XE THÁNG 10/2026 - Mitsubishi Motors Việt Nam",
  "source": "Mitsubishi Motors Việt Nam",
  "cars": [
    {
      "carId": "destinator",
      "variants": [
        {
          "variantName": "Premium",
          "modelYear": "2026",
          "retailPrice": 780000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)",
              "value": 78000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 78 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "Ultimate",
          "modelYear": "2026",
          "retailPrice": 855000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 50% phí trước bạ (~ 43 triệu VNĐ)",
              "value": 43000000,
              "description": "Ưu đãi tương đương 50% phí trước bạ (~ 43 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 25 triệu VNĐ)",
              "value": 25000000,
              "description": "Phiếu nhiên liệu (~ 25 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    },
    {
      "carId": "xpander",
      "variants": [
        {
          "variantName": "MT",
          "modelYear": "2026",
          "retailPrice": 568000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 57 triệu VNĐ)",
              "value": 57000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 57 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 10 triệu VNĐ)",
              "value": 10000000,
              "description": "Phiếu nhiên liệu (~ 10 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "AT",
          "modelYear": "2026",
          "retailPrice": 598000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 59 triệu VNĐ)",
              "value": 59000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 59 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 36 triệu VNĐ)",
              "value": 36000000,
              "description": "Phiếu nhiên liệu (~ 36 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "AT Premium",
          "modelYear": "2026",
          "retailPrice": 659000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ)",
              "value": 66000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 24 triệu VNĐ)",
              "value": 24000000,
              "description": "Phiếu nhiên liệu (~ 24 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    },
    {
      "carId": "xpander-cross",
      "variants": [
        {
          "variantName": "Xpander Cross",
          "modelYear": "2026",
          "retailPrice": 699000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 70 triệu VNĐ)",
              "value": 70000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 70 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 20 triệu VNĐ)",
              "value": 20000000,
              "description": "Phiếu nhiên liệu (~ 20 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    },
    {
      "carId": "xforce",
      "variants": [
        {
          "variantName": "GLX",
          "modelYear": "2026",
          "retailPrice": 605000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 60 triệu VNĐ)",
              "value": 60000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 60 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "Luxury",
          "modelYear": "2026",
          "retailPrice": 665000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ)",
              "value": 66000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 66 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "Ultimate",
          "modelYear": "2026",
          "retailPrice": 720000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 72 triệu VNĐ)",
              "value": 72000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 72 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    },
    {
      "carId": "attrage",
      "variants": [
        {
          "variantName": "MT",
          "modelYear": "2026",
          "retailPrice": 380000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (38 triệu VNĐ)",
              "value": 38000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (38 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 8 triệu VNĐ)",
              "value": 8000000,
              "description": "Phiếu nhiên liệu (~ 8 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Camera lùi (2,5 triệu VNĐ)",
              "value": 2500000,
              "description": "Camera lùi (2,5 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "CVT Premium",
          "modelYear": "2026",
          "retailPrice": 490000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 50% phí trước bạ (24,5 triệu VNĐ)",
              "value": 24500000,
              "description": "Ưu đãi tương đương 50% phí trước bạ (24,5 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 11 triệu VNĐ)",
              "value": 11000000,
              "description": "Phiếu nhiên liệu (~ 11 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Ăngten vây cá (1,5 triệu VNĐ)",
              "value": 1500000,
              "description": "Ăngten vây cá (1,5 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    },
    {
      "carId": "triton",
      "variants": [
        {
          "variantName": "2WD AT GLX",
          "modelYear": "2026",
          "retailPrice": 655000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 39 triệu VNĐ)",
              "value": 39000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 39 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Phiếu nhiên liệu (~ 10 triệu VNĐ)",
              "value": 10000000,
              "description": "Phiếu nhiên liệu (~ 10 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "2WD AT Premium",
          "modelYear": "2026",
          "retailPrice": 782000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ)",
              "value": 46000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "4WD AT Premium",
          "modelYear": "2026",
          "retailPrice": 782000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ)",
              "value": 46000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 46 triệu VNĐ)",
              "calculable": false
            },
            {
              "label": "Gói quà tặng phụ kiện (~ 12 triệu VNĐ)",
              "value": 12000000,
              "description": "Gói quà tặng phụ kiện (~ 12 triệu VNĐ)",
              "calculable": false
            }
          ]
        },
        {
          "variantName": "4WD AT Athlete",
          "modelYear": "2026",
          "retailPrice": 924000000,
          "benefits": [
            {
              "label": "Ưu đãi tương đương 100% phí trước bạ (~ 56 triệu VNĐ)",
              "value": 56000000,
              "description": "Ưu đãi tương đương 100% phí trước bạ (~ 56 triệu VNĐ)",
              "calculable": false
            }
          ]
        }
      ]
    }
  ]
};

export function getMaxPromotionValue(carId: string) {
  const carPromotion = currentPromotion.cars.find(
    (car) => car.carId === carId
  );

  if (!carPromotion) {
    return 0;
  }

  return Math.max(
    0,
    ...carPromotion.variants.map((variant) =>
      variant.benefits.reduce(
        (total, benefit) => total + (benefit.value ?? 0),
        0
      )
    )
  );
}
