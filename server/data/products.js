const products = [
  {
    productName: "Airpods Wireless Bluetooth Headphones",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329378/campusify/products/airpods_emrkwn.jpg",
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
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329431/campusify/products/phone_rbamsz.jpg",
    productDescription:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.",
    brand: "Apple",
    price: 500000,
    countInStock: 7,
    rating: 4.0,
    reviewCount: 8,
    isFeatured: true,
  },
  {
    productName: "Canon EOS 80D DSLR Camera",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329414/campusify/products/camera_d2ghob.jpg",
    productDescription:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design.",
    brand: "Canon",
    price: 250000,
    countInStock: 5,
    rating: 3,
    reviewCount: 12,
    salesCount: 31,
  },
  {
    productName: "Sony Playstation 5",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329438/campusify/products/playstation_qd1zlo.jpg",
    productDescription:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, or music.",
    brand: "Sony",
    price: 220000,
    countInStock: 11,
    rating: 5,
    reviewCount: 12,
    isFeatured: true,
    salesCount: 15,
  },
  {
    productName: "Logitech G-Series Gaming Mouse",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329430/campusify/products/mouse_lv52f9.jpg",
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
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329378/campusify/products/alexa_ppj8ev.jpg",
    productDescription:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces.",
    brand: "Amazon",
    price: 15000,
    countInStock: 0,
    rating: 4,
    reviewCount: 12,
    isFeatured: true,
    salesCount: 20,
  },
  {
    productName: "Logitech MX Master 3 Wireless Mouse",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329462/campusify/products/wireless_mouse_ivdv7w.jpg",
    productDescription:
      "Ultra-fast, ultra-precise scrolling with a comfortable design. The MX Master 3 is the most advanced mouse from Logitech.",
    brand: "Logitech",
    price: 99.99,
    countInStock: 30,
    rating: 4.9,
    reviewCount: 200,
    isFeatured: true,
    salesCount: 600,
  },
  {
    productName: "Nike Air Zoom Pegasus 38 Running Shoes",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329466/campusify/products/red_shoe_ql6m9l.jpg",
    productDescription:
      "The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor.",
    brand: "Nike",
    price: 129.99,
    countInStock: 20,
    rating: 4.6,
    reviewCount: 150,
    isFeatured: true,
    salesCount: 300,
  },
  {
    productName: "Sony WH-1000XM4 Wireless Noise-Canceling Over-Ear Headphones",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329430/campusify/products/headphones_xh1tik.jpg",
    productDescription:
      "Experience the next level of silence with the Sony WH-1000XM4 wireless noise-canceling headphones.",
    brand: "Sony",
    price: 349.99,
    countInStock: 5,
    rating: 4.8,
    reviewCount: 300,
    isFeatured: true,
    salesCount: 800,
  },
  {
    productName: "Mountain Bike",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329406/campusify/products/bicycle_cdpew0.jpg",
    productDescription:
      "Conquer any trail with our high-performance mountain bike. Designed for rugged terrain and adventurous riders.",
    brand: "AdventureGear",
    price: 999.99,
    countInStock: 20,
    rating: 4.8,
    reviewCount: 50,
    isFeatured: true,
    salesCount: 100,
  },
  {
    productName: "Apple AirPods Pro",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329478/campusify/products/wireless_earbuds_ob0eof.jpg",
    productDescription:
      "Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you.",
    brand: "Apple",
    price: 249.99,
    countInStock: 15,
    rating: 4.7,
    reviewCount: 400,
    isFeatured: true,
    salesCount: 1000,
  },
  {
    productName: "Canon EOS Rebel T7 DSLR Camera",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329445/campusify/products/digital_camera_kjykfc.jpg",
    productDescription:
      "Capture stunning photos and videos with the Canon EOS Rebel T7. Equipped with a 24.1 Megapixel CMOS sensor and DIGIC 4+ image processor.",
    brand: "Canon",
    price: 499.99,
    countInStock: 15,
    rating: 4.6,
    reviewCount: 80,
    salesCount: 200,
  },
  {
    productName: "Nike Air Max 270",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1712329466/campusify/products/red_shoe_ql6m9l.jpg",
    productDescription:
      "Experience ultimate comfort and style with the Nike Air Max 270. Featuring a breathable mesh upper and Max Air cushioning for all-day comfort.",
    brand: "Nike",
    price: 129.99,
    countInStock: 25,
    rating: 4.7,
    reviewCount: 120,
    salesCount: 300,
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
