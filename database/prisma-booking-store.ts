import { PrismaClient } from '@prisma/client';
import Booking, { BookingDetails } from "../model/Booking";

const prisma = new PrismaClient();

export async function createBooking(booking: Booking) {
    try {
        return await prisma.booking.create({
            data: {
                CustomerID: booking.CustomerID,
                BookingDate: booking.BookingDate,
                BookingDetails: {
                    create: booking.BookingDetails.map(detail => ({
                        CarID: detail.CarID,
                        Price: detail.Price,
                    })),
                },
            },
            include: {
                BookingDetails: true,
            },
        });
    } catch (err) {
        console.log("Error creating booking", err);
        throw err;
    }
}

export async function getAllBookings() {
    try {
        return await prisma.booking.findMany({
            include: {
                BookingDetails: true,
            },
        });
    } catch (err) {
        console.log("Error fetching bookings", err);
        throw err;
    }
}

export async function getBookingById(id: number) {
    try {
        return await prisma.booking.findUnique({
            where: { BookingID: id },
            include: {
                BookingDetails: true,
            },
        });
    } catch (err) {
        console.log("Error fetching booking", err);
        throw err;
    }
}

export async function updateBooking(id: number, booking: Booking) {
    try {
        return await prisma.booking.update({
            where: { BookingID: id },
            data: {
                CustomerID: booking.CustomerID,
                BookingDate: booking.BookingDate,
                BookingDetails: {
                    deleteMany: {},
                    create: booking.BookingDetails.map(detail => ({
                        CarID: detail.CarID,
                        Price: detail.Price,
                    })),
                },
            },
            include: {
                BookingDetails: true,
            },
        });
    } catch (err) {
        console.log("Error updating booking", err);
        throw err;
    }
}

export async function deleteBooking(id: number) {
    try {
        return await prisma.booking.delete({
            where: { BookingID: id },
        });
    } catch (err) {
        console.log("Error deleting booking", err);
        throw err;
    }
}