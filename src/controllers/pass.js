const bcrypt = require("bcryptjs");

(async () => {
  const password = "admin@098"; // change this if needed
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hash);
})();
UPDATE Users
SET password = '$2b$10$uPJ2j09MqzIJWaAu8M5qHeiA8ZplzzNUXcMGrRczQcoVk1pUdSqf6'
WHERE username = 'admin';
