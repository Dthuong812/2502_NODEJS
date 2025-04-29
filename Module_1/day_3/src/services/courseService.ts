import fs  from 'fs';
import path from "path";
import { course } from "../types/authType";

const courseFile = path.join(__dirname, "../course.json");

export const readCourse = (): course[] => {
    try{
        if(!fs.existsSync(courseFile)){
            console.log("Course file not found, creating new one:", courseFile);
            fs.writeFileSync(courseFile, JSON.stringify([]));
        }
        const data = fs.readFileSync(courseFile, 'utf8');
        return JSON.parse(data);
    }catch(error){
        console.error("Error reading course file:", error);
        return []; 
    }
};

export const writeCourse = (data: course[]): void => {
    try{
        fs.writeFileSync(courseFile, JSON.stringify(data, null, 2));
        console.log("Course data written successfully");
    }catch(error){
        console.error("Error writing course file:", error);
        throw error; 
    }
} ;