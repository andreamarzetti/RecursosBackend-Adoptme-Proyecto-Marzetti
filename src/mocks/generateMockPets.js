import { faker } from '@faker-js/faker';

export function generateMockPets(num) {
  const pets = [];
  for (let i = 0; i < num; i++) {
    pets.push({
      name: faker.animal.name(),
      specie: faker.animal.type(),
      birthDate: faker.date.past(),
      adopted: false,
      owner: null,
      image: faker.image.animals(),
    });
  }
  return pets;
}