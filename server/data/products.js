const products = [
  {
    productName: "Airpods Wireless Bluetooth Headphones",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968326/campusify/products/airpods_wr0sq8.jpg",
    productDescription:
      "Enjoy a seamless wireless experience with AirPods, featuring advanced Bluetooth technology that allows easy connectivity with all your compatible devices. The high-quality AAC audio delivers an immersive sound experience, while the built-in microphone ensures crystal-clear calls. Perfect for music enthusiasts and busy professionals alike.",
    brand: "Apple",
    price: 150,
    countInStock: 10,
    rating: 4.5,
    reviewCount: 12,
  },
  {
    productName: "iPhone 13 Pro 256GB Memory",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968326/campusify/products/phone_fdon6p.jpg",
    productDescription:
      "Discover the iPhone 13 Pro with its revolutionary triple-camera system that enhances your photography skills. The phone features a sleek design and a substantial leap in battery life, ensuring you stay connected and capture beautiful moments throughout the day. An ideal choice for tech enthusiasts and power users.",
    brand: "Apple",
    price: 1700,
    countInStock: 7,
    rating: 4.0,
    reviewCount: 8,
    isFeatured: true,
  },
  {
    productName: "Canon EOS 80D DSLR Camera",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968329/campusify/products/camera_f370zx.jpg",
    productDescription:
      "Capture stunning images with the Canon EOS 80D DSLR camera. This model boasts versatile imaging specifications, including robust focusing systems and intuitive design features that help you take professional-quality photos. Ideal for both amateur and experienced photographers.",
    brand: "Canon",
    price: 750,
    countInStock: 5,
    rating: 3,
    reviewCount: 12,
    salesCount: 31,
  },
  {
    productName: "Sony Playstation 5",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968327/campusify/products/playstation_poakos.jpg",
    productDescription:
      "Transform your home entertainment with the PlayStation 5. This gaming console offers cutting-edge technology, including high-definition graphics and immersive gameplay experiences. Whether you’re a gamer or a multimedia enthusiast, the PS5 is designed to meet all your entertainment needs.",
    brand: "Sony",
    price: 650,
    countInStock: 11,
    rating: 5,
    reviewCount: 12,
    isFeatured: true,
    salesCount: 15,
  },
  {
    productName: "Logitech G-Series Gaming Mouse",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968326/campusify/products/mouse_jvsodz.jpg",
    productDescription:
      "Enhance your gaming experience with the Logitech LIGHTSYNC gaming mouse. It features six programmable buttons that allow you to customize your controls for a smoother gameplay experience. Designed for gamers who demand precision and speed.",
    brand: "Logitech",
    price: 70,
    countInStock: 7,
    rating: 3.5,
    reviewCount: 10,
  },
  {
    productName: "Amazon Echo Dot 3rd Generation",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968327/campusify/products/alexa_eaxfdl.jpg",
    productDescription:
      "Meet the Echo Dot - the most popular smart speaker with a fabric design. Compact and stylish, it fits seamlessly into any space and offers exceptional voice command functionality. Control your smart home, play music, and get information with just your voice.",
    brand: "Amazon",
    price: 70,
    countInStock: 0,
    rating: 4,
    reviewCount: 12,
    isFeatured: true,
    salesCount: 20,
  },
  {
    productName: "Logitech MX Master 3 Wireless Mouse",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968326/campusify/products/mouse_jvsodz.jpg",
    productDescription:
      "Experience ultra-fast and ultra-precise scrolling with the Logitech MX Master 3. Designed for comfort and performance, this wireless mouse offers advanced features and exceptional build quality for professionals and power users.",
    brand: "Logitech",
    price: 60,
    countInStock: 30,
    rating: 4.9,
    reviewCount: 200,
    isFeatured: true,
    salesCount: 600,
  },
  {
    productName: "Nike Air Zoom Pegasus 38 Running Shoes",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968334/campusify/products/red_shoe_nju0iv.jpg",
    productDescription:
      "The Nike Air Zoom Pegasus 38 is designed to offer exceptional comfort and performance for runners. It features responsive foam cushioning and a stylish design, making it a top choice for both casual runners and serious athletes.",
    brand: "Nike",
    price: 50,
    countInStock: 20,
    rating: 4.6,
    reviewCount: 150,
    isFeatured: true,
    salesCount: 300,
  },
  {
    productName: "Sony WH-1000XM4 Wireless Noise-Canceling Over-Ear Headphones",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968328/campusify/products/headphones_ghp8hg.jpg",
    productDescription:
      "Experience unparalleled silence with the Sony WH-1000XM4 wireless noise-canceling headphones. These headphones feature advanced noise-canceling technology and superior sound quality for a truly immersive listening experience.",
    brand: "Sony",
    price: 500,
    countInStock: 5,
    rating: 4.8,
    reviewCount: 300,
    isFeatured: true,
    salesCount: 800,
  },
  {
    productName: "Mountain Bike",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968327/campusify/products/bicycle_pmx5uk.jpg",
    productDescription:
      "Conquer any trail with our high-performance mountain bike. Engineered for rugged terrain and adventurous rides, this bike offers durability and comfort for an enhanced cycling experience. Perfect for outdoor enthusiasts and thrill-seekers.",
    brand: "AdventureGear",
    price: 2500,
    countInStock: 20,
    rating: 4.8,
    reviewCount: 50,
    isFeatured: true,
    salesCount: 100,
  },
  {
    productName: "Apple AirPods Pro",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968332/campusify/products/wireless_earbuds_dnhxq5.jpg",
    productDescription:
      "The Apple AirPods Pro delivers superior sound quality with Active Noise Cancellation and Transparency mode, allowing you to control how much of the outside world you hear. These earbuds offer an immersive audio experience and a comfortable fit for all-day wear.",
    brand: "Apple",
    price: 1500,
    countInStock: 15,
    rating: 4.7,
    reviewCount: 400,
    isFeatured: true,
    salesCount: 1000,
  },
  {
    productName: "Canon EOS Rebel T7 DSLR Camera",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968330/campusify/products/digital_camera_wttssl.jpg",
    productDescription:
      "The Canon EOS Rebel T7 is equipped with a 24.1 Megapixel CMOS sensor and DIGIC 4+ image processor, enabling you to capture high-quality photos and videos with ease. Its user-friendly interface and versatile features make it a great choice for photography enthusiasts.",
    brand: "Canon",
    price: 700,
    countInStock: 15,
    rating: 4.6,
    reviewCount: 80,
    salesCount: 200,
  },
  {
    productName: "Nike Air Max 270",
    imageUrl:
      "https://res.cloudinary.com/drmy6ss8n/image/upload/v1722968330/campusify/products/sneaker_i3rlor.jpg",
    productDescription:
      "Step into comfort with the Nike Air Max 270. Featuring a breathable mesh upper and Max Air cushioning, these sneakers offer a stylish look and all-day comfort for both casual wear and athletic activities.",
    brand: "Nike",
    price: 50,
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
