import bcrypt from "bcryptjs";

const userData = [
  {
    lastName: "Doe",
    otherNames: "John",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    password: bcrypt.hashSync("123456", 10),
    profilePictureURL:
      "https://portal.tau.edu.ng/uploads/student/kajeyale-jadesola-oluwaseun.jpg",
    userType: "student",
    isVendor: true,
    isAdmin: true,
  },
  {
    lastName: "Smith",
    otherNames: "Jane",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    password: bcrypt.hashSync("123456", 10),
    profilePictureURL:
      "https://tau.edu.ng/assets/images/staffphotos/TAUSSPF035.jpg",
    userType: "staff",
    isVendor: false,
    isAdmin: false,
  },
  {
    lastName: "Brown",
    otherNames: "Mike",
    email: "mike.brown@example.com",
    phoneNumber: "555-111-2222",
    password: bcrypt.hashSync("123456", 10),
    profilePictureURL:
      "https://portal.tau.edu.ng/uploads/student/adebayo-oluwafemi-samuel.jpg",
    userType: "student",
    isVendor: false,
    isAdmin: false,
  },
  {
    lastName: "Taylor",
    otherNames: "Alex",
    email: "alex.taylor@example.com",
    phoneNumber: "111-222-3333",
    password: bcrypt.hashSync("123456", 10),
    profilePictureURL:
      "https://portal.tau.edu.ng/uploads/student/elelu-abdulkareem-ayomikun.jpg",
    userType: "staff",
    isVendor: false,
    isAdmin: false,
  },
];

export default userData;
