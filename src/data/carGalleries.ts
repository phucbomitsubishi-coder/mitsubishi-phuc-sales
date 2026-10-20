// Bộ ảnh ngoại thất / nội thất của từng xe (public/images/cars/<id>/gallery/...).
// Dùng cho thư viện ảnh (CarGallery) và các khối tính năng (CarFeatures) trên trang xe.
// Khóa là car.name. Xe chưa có bộ ảnh thì gallery dùng tạm car.image.
export type GalleryType = "exterior" | "interior";

export const carGalleries: Record<
  string,
  Record<GalleryType, string[]>
> = {
  "Mitsubishi Xforce": {
    exterior: [
      "/images/cars/xforce/gallery/exterior/exterior-01.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-02.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-03.jpg",
      "/images/cars/xforce/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xforce/gallery/interior/interior-01.jpg",
      "/images/cars/xforce/gallery/interior/interior-02.jpg",
      "/images/cars/xforce/gallery/interior/interior-03.jpg",
      "/images/cars/xforce/gallery/interior/interior-04.jpg",
    ],
    },

  "Mitsubishi Xpander": {
    exterior: [
      "/images/cars/xpander/gallery/exterior/exterior-01.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-02.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-03.jpg",
      "/images/cars/xpander/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xpander/gallery/interior/interior-01.jpg",
      "/images/cars/xpander/gallery/interior/interior-02.jpg",
      "/images/cars/xpander/gallery/interior/interior-03.jpg",
      "/images/cars/xpander/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Xpander Cross": {
    exterior: [
      "/images/cars/xpander-cross/gallery/exterior/exterior-01.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-02.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-03.jpg",
      "/images/cars/xpander-cross/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/xpander-cross/gallery/interior/interior-01.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-02.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-03.jpg",
      "/images/cars/xpander-cross/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Attrage": {
    exterior: [
      "/images/cars/attrage/gallery/exterior/exterior-01.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-02.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-03.jpg",
      "/images/cars/attrage/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/attrage/gallery/interior/interior-01.jpg",
      "/images/cars/attrage/gallery/interior/interior-02.jpg",
      "/images/cars/attrage/gallery/interior/interior-03.jpg",
      "/images/cars/attrage/gallery/interior/interior-04.jpg",
    ],
  },
    "Mitsubishi Triton": {
    exterior: [
      "/images/cars/triton/gallery/exterior/exterior-01.jpg",
      "/images/cars/triton/gallery/exterior/exterior-02.jpg",
      "/images/cars/triton/gallery/exterior/exterior-03.jpg",
      "/images/cars/triton/gallery/exterior/exterior-04.jpg",
    ],
    interior: [
      "/images/cars/triton/gallery/interior/interior-01.jpg",
      "/images/cars/triton/gallery/interior/interior-02.jpg",
      "/images/cars/triton/gallery/interior/interior-03.jpg",
      "/images/cars/triton/gallery/interior/interior-04.jpg",
    ],
  },
  "Mitsubishi Destinator": {
  exterior: [
    "/images/cars/destinator/gallery/exterior/exterior-01.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-02.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-03.jpg",
    "/images/cars/destinator/gallery/exterior/exterior-04.jpg",
  ],
  interior: [
    "/images/cars/destinator/gallery/interior/interior-01.jpg",
    "/images/cars/destinator/gallery/interior/interior-02.jpg",
    "/images/cars/destinator/gallery/interior/interior-03.jpg",
    "/images/cars/destinator/gallery/interior/interior-04.jpg",
  ],
},
};
