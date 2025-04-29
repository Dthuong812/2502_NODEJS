import fs from 'fs';
import path from 'path';
import { user } from "../types/authType";

const teacherFile = path.join(__dirname, "../teacher.json");

export const readTeacher = (): user[] => {
    try {
        if (!fs.existsSync(teacherFile)) {
            console.log("Teacher file not found, creating new one:", teacherFile);
            fs.writeFileSync(teacherFile, JSON.stringify([]));
        }
        const data = fs.readFileSync(teacherFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading teacher file:", error);
        return []; // Return empty array on error
    }
};

export const writeTeacher = (data: user[]): void => {
    try {
        fs.writeFileSync(teacherFile, JSON.stringify(data, null, 2));
        console.log("Teacher data written successfully");
    } catch (error) {
        console.error("Error writing teacher file:", error);
        throw error; // Propagate error
    }
};

export const getTeacherEmail = (teacherName: string): string | null => {
    const teacherFile = path.join(__dirname, "../teacher.json");
    const teacherData = JSON.parse(fs.readFileSync(teacherFile, "utf-8"));
    const teacher = teacherData.find((t: { name: string; email: string }) => t.name === teacherName);
    return teacher ? teacher.email : null;
};