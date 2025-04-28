import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mailConfig';

export const sendConfirmationEmail = async (to: string, name: string) => {
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
        subject: 'Đăng ký thành công',
        text: `Xin chào ${name},\n\nCảm ơn bạn đã đăng ký. Tài khoản của bạn đã được tạo thành công.\n\nTrân trọng,\nĐội ngũ của bạn`
    };

    console.log('Đang gửi email tới:', to);
    await transporter.sendMail(mailOptions);
    console.log('Email đã gửi thành công');
};
