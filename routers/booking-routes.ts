import express from "express";
import Booking, { BookingDetails } from "../model/Booking";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} from "../database/prisma-booking-store";

const router = express.Router();

// Create a new booking
router.post("/add", async (req, res) => {
    try {
        const booking: Booking = req.body;
        const result = await createBooking(booking);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Error creating booking");
    }
});

// Get all bookings
router.get("/view", async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (err) {
        res.status(500).send("Error fetching bookings");
    }
});

// Get a booking by ID
router.get("/view/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const booking = await getBookingById(id);
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).send("Booking not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching booking");
    }
});

// Update a booking
router.put("/update/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const booking: Booking = req.body;
        const updated = await updateBooking(id, booking);
        res.json(updated);
    } catch (err) {
        res.status(500).send("Error updating booking");
    }
});

// Delete a booking
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteBooking(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Error deleting booking");
    }
});

export default router;