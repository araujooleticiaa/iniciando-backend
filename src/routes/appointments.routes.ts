import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (req, res) => {
 const { provider_id, date } = req.body;

 const parsedDate = parseISO(date);

 const createAppointmentService = new CreateAppointmentService();

 const appointment = await createAppointmentService.execute({
  date: parsedDate,
  provider_id,
 });

 return res.json(appointment);
});

appointmentsRouter.get('/', async (req, res) => {
 const appointmentsRepository = getCustomRepository(AppointmentsRepository);
 const appointments = await appointmentsRepository.find();
 return res.json(appointments);
});

export default appointmentsRouter;
