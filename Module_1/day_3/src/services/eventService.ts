import path from "path";
import fs from "fs";
import { event } from "../types/authType";

const fileEvent = path.join(__dirname, "../event.json");

export const readEvent = () => {
    try {
        if (!fs.existsSync(fileEvent)) {
            console.log("Event file not found, creating new one:", fileEvent);
            fs.writeFileSync(fileEvent, JSON.stringify([]));
        }
        const data = fs.readFileSync(fileEvent, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading event file:", error);
        return [];
    }
};
export const writeEvent = (data : event[]): void => {
    try {
        fs.writeFileSync(fileEvent, JSON.stringify(data, null, 2));
        console.log("Event data written successfully");
    } catch (error) {
        console.error("Error writing event file:", error);
        throw error;
    }
}
