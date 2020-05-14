import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
 try {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(
   appointmentsRepository,
  );

  const appointment = createAppointmentService.execute({
   date: parsedDate,
   provider,
  });

  return res.json(appointment);
 } catch (err) {
  return res.status(400).json({ error: err.message });
 }
});

appointmentsRouter.get('/', (req, res) => {
 const appointments = appointmentsRepository.all();
 return res.json(appointments);
});

export default appointmentsRouter;
