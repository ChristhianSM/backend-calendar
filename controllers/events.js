const { response } = require("express");
const Event = require("../models/Events.model");

const getEvents = async(req, res = response) => {

  const events = await Event.find()
                            // Para mostrar todos los datos de la referencia
                            .populate("user", "name password"); 

  res.status(200).json({
    ok: true,
    msg: "Eventos obtenidos correctamente",
    events
  })
}

const createEvent = async (req, res = response) => {

  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSave = await event.save();

    res.status(200).json({
      ok: true,
      msg: "Eventos obtenidos correctamente",
      event: eventSave
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
  
}

const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "Evento no existe",
        eventId
      })
    }

    // Aqui verificamos que el usuario pueda editar sus propias notas
    if (event.user.toString() !== uid) {
      return res.status(400).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
        eventId
      })
    }

    const newEvent= {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.status(200).json({
      ok: true,
      msg: "Eventos obtenidos correctamente",
      eventUpdated
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
}

const deleteEvent = async(req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "Evento no existe",
        eventId
      })
    }

    // Aqui verificamos que el usuario pueda editar sus propias notas
    if (event.user.toString() !== uid) {
      return res.status(400).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
        eventId
      })
    }

    const eventDeleted = await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      msg: "Evento eliminado correctamente",
      eventDeleted
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}