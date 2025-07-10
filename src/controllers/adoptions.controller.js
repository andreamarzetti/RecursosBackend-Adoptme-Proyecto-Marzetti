import { adoptionsService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionsService.getAll();
    res.status(200).send({ status: "success", payload: adoptions });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: "Error al obtener adopciones" });
  }
};

const getAdoption = async (req, res) => {
    const id = req.params.aid;
    try {
      const adoption = await adoptionsService.getById(id);
      if (!adoption)
        return res.status(404).send({ status: "error", error: "Adopción no encontrada" });
      
      // Opcional: mapear owner a userId para que el test coincida
      const adoptionResponse = {
        ...adoption,
        userId: adoption.owner,
        petId: adoption.pet,
      };
  
      res.status(200).send({ status: "success", payload: adoptionResponse });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", error: "Error al obtener adopción" });
    }
  };
  


const createAdoption = async (req, res) => {
    const { userId, petId, date } = req.body;
    if (!userId || !petId || !date) {
      return res.status(400).send({ status: "error", error: "Campos incompletos" });
    }
    try {
      // Usar los campos correctos que el schema espera: owner y pet
      const newAdoption = await adoptionsService.create({ owner: userId, pet: petId, date });
      res.status(201).send(newAdoption);
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", error: "Error creando adopción" });
    }
  };
  

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
};
