import { event } from './../types/authType';
import cron from 'node-cron';
import express, { Request, Response } from 'express';
import { readEvent, writeEvent } from '../services/eventService';
import { sendConfirmationEmail } from '../services/emailService';
import e from 'express';

const eventRoute = express.Router();


eventRoute.post("/", async (req: Request, res: Response) => {
    const { name, description, time, participants } = req.body;

    let events = readEvent();

    const newEvent = {
        id: Date.now(),
        name,
        description,
        time: new Date(time),
        participants
    };

    events.push(newEvent);

    try {
        await writeEvent(events);
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Error creating event", error });
    }
});

eventRoute.get("/", (req: Request, res: Response) => {
    const events = readEvent();
    res.status(200).json(events);
}
);

eventRoute.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, time, participants } = req.body;
    let events = readEvent();
    const eventIndex = events.findIndex((event: { id: number }) => event.id === parseInt(id));
    if (eventIndex === -1) {
        res.status(404).json({ message: "Event not found" });
        return 
    }
    const updatedEvent = {
        ...events[eventIndex],
        name,
        description,
        time: new Date(time),
        participants
    };
    events[eventIndex] = updatedEvent;
    try {
        writeEvent(events);
        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Error updating event", error });
    }
}
);

eventRoute.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    let events = readEvent();
    const eventIndex = events.findIndex((event: { id: number }) => event.id === parseInt(id));
    if (eventIndex === -1) {
        res.status(404).json({ message: "Event not found" });
        return;
    }
    events.splice(eventIndex, 1);
    try {
        writeEvent(events);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Error deleting event", error });
    }
}
);


cron.schedule('* * * * *', async () => {
    console.log("Running email reminders...");

    const events = readEvent();
    const now = new Date();

    for (const event of events) {
        const eventTime = new Date(event.time);

        if (eventTime > now && eventTime <= new Date(now.getTime() + 60 * 60 * 1000)) {
            for (const participant of event.participants) {
                try {
                    await sendConfirmationEmail(
                        participant,
                        `Nhắc nhở: ${event.name}`,
                        `Xin chào,\n\nBạn có một sự kiện sắp diễn ra:\n\n- Tên sự kiện: ${event.name}\n- Mô tả: ${event.description}\n- Thời gian: ${eventTime.toLocaleString()}\n\nTrân trọng,\nHệ thống quản lý sự kiện`
                    );
                    console.log(`Reminder email sent to: ${participant}`);
                } catch (error) {
                    console.error(`Failed to send reminder email to ${participant}:`, error);
                }
            }
        } else {
            console.log(`Event "${event.name}" is not within 1 hour.`);
        }
    }
});



export default eventRoute;
