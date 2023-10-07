import express from "express";

import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/locations',EventsController.getEvents)

export default router;