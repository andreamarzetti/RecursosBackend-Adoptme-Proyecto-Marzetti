import bcrypt from 'bcrypt';

function randomRole() {
  return Math.random() > 0.5 ? 'user' : 'admin';
}

export function generateMockUsers(count = 1) {
  const users = [];
  const passwordHash = bcrypt.hashSync('coder123', 10);

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: `Nombre${i + 1}`,
      last_name: `Apellido${i + 1}`,
      email: `usuario${i + 1}@mail.com`,
      password: passwordHash,
      role: randomRole(),
      pets: [],
    });
  }
  return users;
}

export function generateMockPets(count = 1) {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      name: `Pet${i + 1}`,
      type: 'dog',
      age: Math.floor(Math.random() * 10) + 1,
      adopted: false,
    });
  }
  return pets;
}