import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (req, res) => {
 try {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
   date: parsedDate,
   provider_id,
  });

  return res.json(appointment);
 } catch (err) {
  return res.status(400).json({ error: err.message });
 }
});

appointmentsRouter.get('/', async (req, res) => {
 const appointmentsRepository = getCustomRepository(AppointmentsRepository);
 const appointments = await appointmentsRepository.find();
 return res.json(appointments);
});

export default appointmentsRouter;
