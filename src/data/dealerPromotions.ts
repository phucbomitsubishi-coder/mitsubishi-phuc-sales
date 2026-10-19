// TỰ SINH bởi scripts/sync-dealer-promos.mjs từ app báo giá. KHÔNG sửa tay.
// Chương trình ĐẠI LÝ, chỉ dùng cho landing page quảng cáo /uu-dai/* (noindex). Web chính vẫn chỉ ghi ưu đãi nhà máy (promotions.ts).

export type DealerPromotionVariant = {
  variant: string;
  benefits: { label: string; value: number }[];
};

export const dealerPromotion = {
  month: 10,
  year: 2026,
  cars: {
    "xforce": [
      {
        "variant": "GLX",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 60500000
          }
        ]
      },
      {
        "variant": "Luxury",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 66500000
          }
        ]
      },
      {
        "variant": "Ultimate",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 72000000
          }
        ]
      }
    ],
    "triton": [
      {
        "variant": "4WD AT Athlete",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 56000000
          }
        ]
      },
      {
        "variant": "4WD AT Premium",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 46000000
          },
          {
            "label": "Phiếu nhiên liệu",
            "value": 12000000
          }
        ]
      },
      {
        "variant": "2WD AT Premium",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 46000000
          }
        ]
      },
      {
        "variant": "2WD AT GLX",
        "benefits": [
          {
            "label": "Tặng 02 năm đổ dầu miễn phí",
            "value": 49000000
          }
        ]
      }
    ],
    "attrage": [
      {
        "variant": "CVT Premium",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 49000000
          },
          {
            "label": "Ăng ten vây cá",
            "value": 1500000
          }
        ]
      },
      {
        "variant": "MT",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 38000000
          },
          {
            "label": "Camera lùi",
            "value": 2500000
          }
        ]
      }
    ],
    "xpander": [
      {
        "variant": "AT Premium",
        "benefits": [
          {
            "label": "Tặng 03 năm đổ xăng miễn phí",
            "value": 90000000
          }
        ]
      },
      {
        "variant": "AT",
        "benefits": [
          {
            "label": "Tặng 03 năm đổ xăng miễn phí",
            "value": 95000000
          }
        ]
      },
      {
        "variant": "MT",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 57000000
          }
        ]
      }
    ],
    "xpander-cross": [
      {
        "variant": "Xpander Cross",
        "benefits": [
          {
            "label": "Tặng 03 năm đổ xăng miễn phí",
            "value": 90000000
          }
        ]
      }
    ],
    "destinator": [
      {
        "variant": "Premium",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 78000000
          }
        ]
      },
      {
        "variant": "Ultimate",
        "benefits": [
          {
            "label": "Ưu đãi 100% lệ phí trước bạ",
            "value": 85500000
          }
        ]
      }
    ]
  } as Record<string, DealerPromotionVariant[]>,
};
