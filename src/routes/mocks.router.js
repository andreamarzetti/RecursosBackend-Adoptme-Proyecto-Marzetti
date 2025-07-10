import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();

// GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
  const count = parseInt(req.query.count) || 50;
  const pets = generateMockPets(count);
  res.status(200).json({ status: 'success', pets });
});

// GET /api/mocks/mockingusers?count=50
router.get('/mockingusers', (req, res) => {
  const count = parseInt(req.query.count) || 50;
  const users = generateMockUsers(count);
  res.status(200).json({ status: 'success', users });
});

// POST /api/mocks/generateData
// Body: { users: 10, pets: 20 }
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  let userDocs = [];
  let petDocs = [];

  if (users > 0) {
    const mockUsers = generateMockUsers(users);
    userDocs = await UserModel.insertMany(mockUsers);
  }

  if (pets > 0) {
    const mockPets = generateMockPets(pets);
    petDocs = await PetModel.insertMany(mockPets);
  }

  res.status(201).json({
    status: 'success',
    inserted: { users: userDocs.length, pets: petDocs.length },
    users: userDocs,
    pets: petDocs,
  });
});

export default router;