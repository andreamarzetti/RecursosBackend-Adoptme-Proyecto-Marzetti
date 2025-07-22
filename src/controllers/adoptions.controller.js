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

    // Mapear owner y pet para que coincida con userId y petId en la respuesta
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
    const newAdoption = await adoptionsService.create({ owner: userId, pet: petId, date });

    // Mapear para que la respuesta tenga userId y petId
    const adoptionResponse = {
      _id: newAdoption._id,
      userId: newAdoption.owner,
      petId: newAdoption.pet,
      date: newAdoption.date,
      // y cualquier otro campo que quieras exponer
    };

    res.status(201).send(adoptionResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: "Error creando adopción" });
  }
};

const updateAdoption = async (req, res) => {
  const id = req.params.aid;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).send({ status: "error", error: "Datos de actualización incompletos" });
  }

  try {
    const updatedAdoption = await adoptionsService.update(id, updateData);
    if (!updatedAdoption) {
      return res.status(404).send({ status: "error", error: "Adopción no encontrada para actualizar" });
    }
    res.status(200).send(updatedAdoption);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: "Error actualizando adopción" });
  }
};

const deleteAdoption = async (req, res) => {
  const id = req.params.aid;
  try {
    const deleted = await adoptionsService.delete(id);
    if (!deleted) {
      return res.status(404).send({ status: "error", error: "Adopción no encontrada para eliminar" });
    }
    res.status(200).send({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: "Error eliminando adopción" });
  }
};

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
  updateAdoption,
  deleteAdoption,
};
