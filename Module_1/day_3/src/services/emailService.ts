import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mailConfig';

export const sendConfirmationEmail = async (to: string, subject: string, text: string) => {
    if (!mailConfig.SMTP_USER || !mailConfig.SMTP_PASS || !mailConfig.FROM_EMAIL) {
        throw new Error('Thiếu thông tin cấu hình email');
    }

    const transporter = nodemailer.createTransport({
        host: mailConfig.SMTP_HOST.trim(),
        port: Number(mailConfig.SMTP_PORT),
        secure: false, 
        auth: {
            user: mailConfig.SMTP_USER,
            pass: mailConfig.SMTP_PASS,
        },
    });

    console.log('Kiểm tra kết nối transporter...');
    await transporter.verify();

    const mailOptions = {
        from: mailConfig.FROM_EMAIL,
        to,
        subject,
        text, 
    };

    console.log('Đang gửi email tới:', to);
    await transporter.sendMail(mailOptions);
    console.log('Email đã gửi thành công');

  
};
