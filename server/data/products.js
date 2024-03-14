const products = [
  {
    productName: "Airpods Wireless Bluetooth Headphones",
    imageUrl: "/images/airpods.jpg",
    productDescription:
      "Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers an immersive listening experience. Built-in microphone allows you to take calls while working.",
    brand: "Apple",
    price: 45000,
    countInStock: 10,
    rating: 4.5,
    reviewCount: 12,
  },
  {
    productName: "iPhone 13 Pro 256GB Memory",
    imageUrl: "/images/phone.jpg",
    productDescription:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.",
    brand: "Apple",
    price: 500000,
    countInStock: 7,
    rating: 4.0,
    reviewCount: 8,
  },
  {
    productName: "Canon EOS 80D DSLR Camera",
    imageUrl: "/images/camera.jpg",
    productDescription:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design.",
    brand: "Canon",
    price: 250000,
    countInStock: 5,
    rating: 3,
    reviewCount: 12,
  },
  {
    productName: "Sony Playstation 5",
    imageUrl: "/images/playstation.jpg",
    productDescription:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, or music.",
    brand: "Sony",
    price: 220000,
    countInStock: 11,
    rating: 5,
    reviewCount: 12,
  },
  {
    productName: "Logitech G-Series Gaming Mouse",
    imageUrl: "/images/mouse.jpg",
    productDescription:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience.",
    brand: "Logitech",
    price: 15000,
    countInStock: 7,
    rating: 3.5,
    reviewCount: 10,
  },
  {
    productName: "Amazon Echo Dot 3rd Generation",
    imageUrl: "/images/alexa.jpg",
    productDescription:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces.",
    brand: "Amazon",
    price: 15000,
    countInStock: 0,
    rating: 4,
    reviewCount: 12,
  },
];

const categoryData = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Smartphones" },
      { name: "Laptops" },
      { name: "Headphones" },
      { name: "Cameras and Photography" },
    ],
  },
  {
    name: "Clothing",
    subcategories: [
      { name: "Men's Clothing" },
      { name: "Women's Clothing" },
      { name: "Footwear" },
      { name: "Accessories" },
    ],
  },
  {
    name: "Home and Garden",
    subcategories: [
      { name: "Furniture" },
      { name: "Kitchen Appliances" },
      { name: "Home Decor" },
      { name: "Bedding and Linens" },
    ],
  },
  {
    name: "Sports and Outdoors",
    subcategories: [
      { name: "Outdoor Recreation" },
      { name: "Fitness Equipment" },
      { name: "Sports Apparel" },
      { name: "Camping and Hiking" },
    ],
  },
  {
    name: "Books and Stationery",
    subcategories: [
      { name: "Fiction" },
      { name: "Non-Fiction" },
      { name: "Office Supplies" },
      { name: "Notebooks and Journals" },
    ],
  },
];

export { products, categoryData };
