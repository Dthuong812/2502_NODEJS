import cron from 'node-cron';
import { course, review } from './../types/authType';
import { validateCourse, validateGetCourse } from './../middleware/validation';
import  express, { Request, Response }  from 'express';

import { validationResult } from 'express-validator';
import { readCourse, writeCourse } from '../services/courseService';
import { sendConfirmationEmail } from '../services/emailService';
import { getTeacherEmail } from '../services/teacherService';



const courseRoute = express.Router();


courseRoute.post("/", validateCourse, async (req: Request, res: Response) => {
    console.log("Received course creation request:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { nameCourse, description, teacher, startDate, endDate } = req.body;
    console.log("Processing course creation for:", nameCourse);

    const course = readCourse();

    const existingCourse = course.find((course) => course.nameCourse === nameCourse);
    if (existingCourse) {
        console.log("Course already exists:", nameCourse);
        res.status(400).json({ message: "Khóa học đã tồn tại." });
        return;
    }

    const newCourse = {
        id: Date.now(),
        nameCourse,
        description,
        teacher,
        startDate,
        endDate
    };
    course.push(newCourse);
    writeCourse(course);
    console.log("Course saved to JSON:", nameCourse);

    const teacherEmail = getTeacherEmail(teacher);
    if (!teacherEmail) {
        console.error("Teacher email not found for:", teacher);
        res.status(400).json({ message: "Không tìm thấy email của giảng viên." });
        return;
    }

    try {
        await sendConfirmationEmail(
            teacherEmail,
            `Khóa học mới: ${nameCourse}`,
            `Xin chào,\n\nKhóa học "${nameCourse}" đã được thêm thành công.\n\nTrân trọng,\nĐội ngũ quản lý khóa học`
        );
        console.log("Email notification sent to instructor:", teacher);
        res.status(201).json({ message: "Khóa học đã được tạo thành công và email thông báo đã được gửi." });
    } catch (error) {
        console.error("Failed to send email notification:", error);
        res.status(500).json({ message: "Khóa học đã được tạo thành công, nhưng không thể gửi email thông báo." });
    }
})


courseRoute.get("/",validateGetCourse,(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { limit, page, search } = req.query;

    let courses = readCourse();

    if(search) {
        courses = courses.filter((course) => course.nameCourse.toLowerCase().includes((search as string).toLowerCase()));
    }

    const pageSize = Number(limit) || 10;
    const pageNumber = Number(page) || 1;  
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const paginatedCourses = courses.slice(startIndex, endIndex);

    if(paginatedCourses.length === 0) {
        res.status(404).json({ message: "Không tìm thấy khóa học nào." });
    }
    else {
        res.status(200).json({
            totalCourses: courses.length,
            currentPage: pageNumber,
            totalPages: Math.ceil(courses.length / pageSize),
            courses: paginatedCourses
        });
    }
});

courseRoute.put("/:id", validateCourse, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());  
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const {id} = req.params;
    const { nameCourse, description, teacher, startDate, endDate } = req.body;

    let courses = readCourse();

    const courseIndex = courses.findIndex((course) => course.id === Number(id));
    if (courseIndex === -1) {
        console.log("Course not found with ID:", id);
        res.status(404).json({ message: "Không tìm thấy khóa học." });
        return;
    }

    courses[courseIndex] = {
        ...courses[courseIndex],
        nameCourse,
        description,
        teacher,    
        startDate,
        endDate,
    }

    writeCourse(courses);
    console.log("Course updated:", id);
    res.status(200).json({ message: "Khóa học đã được cập nhật thành công." });
});

courseRoute.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;  
    let courses = readCourse();

    const courseIndex = courses.findIndex((course) => course.id === Number(id));
    if (courseIndex === -1) {
        console.log("Course not found with ID:", id);
        res.status(404).json({ message: "Không tìm thấy khóa học." });
        return;
    }   

    const deletedCourse = courses.splice(courseIndex, 1)[0];
    writeCourse(courses);
    console.log("Course deleted:", deletedCourse.nameCourse);
    res.status(200).json({ message: "Khóa học đã được xóa thành công." });
});
courseRoute.post("/:id/review", async(req: Request, res: Response) => {
    const { id } = req.params;
    const {student, rating, comment} = req.body;

    let courses = readCourse();

    const course = courses.find((course) => course.id === Number(id));
    if (!course) {
        console.log("Course not found with ID:", id);
        res.status(404).json({ message: "Không tìm thấy khóa học." });  
        return;
    }

    const newReview = {
        id: Date.now(),
        student,
        rating,
        comment,
        createdAt: new Date()
    };

    if (!course.reviews) {
        course.reviews = [];
    }
    course.reviews.push(newReview);
    writeCourse(courses);
    console.log("Review added to course:", id);

    const teacherEmail = getTeacherEmail(course.teacher);
    if (!teacherEmail) {
        console.error("Teacher email not found for:", course.teacher);
        res.status(400).json({ message: "Không tìm thấy email của giảng viên." });
        return;
    }

    try{
        await sendConfirmationEmail(
            teacherEmail,
            `Đánh giá mới cho khóa học: ${course.nameCourse}`,
            `Xin chào,\n\nKhóa học "${course.nameCourse}" đã nhận được một đánh giá mới từ ${student}.\n\nTrân trọng,\nĐội ngũ quản lý khóa học`
        )
        console.log("Email notification sent to instructor:", course.teacher);
        res.status(201).json({ message: "Đánh giá đã được thêm thành công và email thông báo đã được gửi." });
    } catch (error) {
        console.error("Failed to send email notification:", error);
        res.status(500).json({ message: "Đánh giá đã được thêm thành công, nhưng không thể gửi email thông báo." });

    }
    res.status(201).json({ message: "Đánh giá đã được thêm thành công." });
});

courseRoute.get("/:id/review", async(req: Request, res: Response) => {
    const {id} = req.params;

    let courses = readCourse();

    const course = courses.find((course) => course.id === Number(id));
    if (!course) {
        console.log("Course not found with ID:", id);
        res.status(404).json({ message: "Không tìm thấy khóa học." });
        return;
    }
    res.status(200).json({
        reviews: course.reviews || [],
        totalReviews: course.reviews ? course.reviews.length : 0
    })
});

courseRoute.put("/review/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const { student, rating, comment } = req.body;

    let courses = readCourse();

    let reviewFound = false;
    for (const course of courses) {
        if (course.reviews) {
            const reviewIndex = course.reviews.findIndex((review) => review.id === Number(id));
            if (reviewIndex !== -1) {
                course.reviews[reviewIndex] = {
                    ...course.reviews[reviewIndex],
                    student,
                    rating,
                    comment,
                    createdAt: new Date()
                };
                reviewFound = true;
                break;
            }
        }
    }
    if(!reviewFound) {
        console.log("Review not found with ID:", id);
        res.status(404).json({ message: "Không tìm thấy đánh giá." });
        return;
    }

    writeCourse(courses);
    console.log("Review updated:", id);
    res.status(200).json({ message: "Đánh giá đã được cập nhật thành công." });
});

cron.schedule('0 9 * * *', async () => {
    console.log("Running daily email reminders...");

    const courses = readCourse();

    for (const course of courses) {
        if (course.reviews && course.reviews.length > 0) {
            const latestReview = course.reviews[course.reviews.length - 1];
            const teacherEmail = getTeacherEmail(course.teacher); 
            if (!teacherEmail) {
                console.error(`Teacher email not found for: ${course.teacher}`);
                continue; 
            }

            try {
                await sendConfirmationEmail(
                    teacherEmail,
                    `Nhắc nhở: Đánh giá mới cho khóa học ${course.nameCourse}`,
                    `Xin chào,\n\nBạn có một đánh giá mới cho khóa học "${course.nameCourse}".\n\nChi tiết đánh giá:\n- Học viên: ${latestReview.student}\n- Đánh giá: ${latestReview.rating}/5\n- Nhận xét: ${latestReview.comment}\n\nTrân trọng,\nHệ thống quản lý khóa học`
                );
                console.log("Reminder email sent to teacher:", teacherEmail);
            } catch (error) {
                console.error("Failed to send reminder email:", error);
            }
        }
    }
});
export default courseRoute;