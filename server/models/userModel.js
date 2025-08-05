const bcrypt = require('bcrypt');

//fake user db(array)
const users = [];

//add new user to array
async function addUser(name, email, password_hash) {
  //hash raw pass
  const hashedPassword = await bcrypt.hash(password_hash, 10);
  const user = {
    id: Date.now().toString(), //generate unique ID as string
    name,
    email,
    password: hashedPassword,
    role: 'tenant' //default, can be changed to manager or admin
  };
  users.push(user);
  return user;
}

//find user by name (used by passport login)
function findUserByName(name) {
  console.log('[FIND USER] Comparing against users:', users);
  return users.find((u) => u.name === name);
}

//export everything
module.exports = {
  users,
  addUser,
  findUserByName
};