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
  },
];

export default userData;
