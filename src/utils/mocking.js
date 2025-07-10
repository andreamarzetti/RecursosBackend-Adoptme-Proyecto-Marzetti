import { faker } from '@faker-js/faker';

// Generador de mascotas mock
export function generateMockPets(count = 1) {
  const pets = [];
  const animalTypes = ['dog', 'cat', 'horse', 'snake', 'bird', 'rabbit'];

  for (let i = 0; i < count; i++) {
    // Elige un tipo aleatorio
    const specie = faker.helpers.arrayElement(animalTypes);

    // Genera nombre según el tipo (para dog y cat usa faker.animal.dog/gato, para el resto un nombre general)
    let name;
    if (specie === 'dog') name = faker.animal.dog();
    else if (specie === 'cat') name = faker.animal.cat();
    else name = faker.word.noun(); // palabra random para el resto

    pets.push({
      name,
      specie,
      birthDate: faker.date.past(),
      adopted: false,
      owner: null,
      image: faker.image.urlPicsumPhotos(), 
    });
  }
  return pets;
}

// Generador de usuarios mock
export function generateMockUsers(count = 1) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      password: faker.internet.password(),
      role: Math.random() > 0.5 ? 'user' : 'admin',
      pets: [],
    });
  }
  return users;
}