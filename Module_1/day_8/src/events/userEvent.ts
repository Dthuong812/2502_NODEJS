import { EventEmitter } from 'events';
import { IUser } from '../models/User';
import { sendConfirmationEmail } from '../utils/mailService';

export const userEvent = new EventEmitter();

// Giới hạn số lượng listener để tránh rò rỉ bộ nhớ
userEvent.setMaxListeners(10);

userEvent.on('user_registered', async (user: IUser) => {
  try {
    console.log(`Chuẩn bị gửi email chào mừng đến ${user.email}`);
    const subject = 'Chào mừng bạn đến với ứng dụng của chúng tôi!';
    const text = `Xin chào ${user.name},\n\nCảm ơn bạn đã đăng ký! Chúng tôi rất vui được chào đón bạn.\n\nTrân trọng,\nĐội ngũ ứng dụng`;
    await sendConfirmationEmail(user.email, subject, text);
    console.log(`Email chào mừng đã gửi đến ${user.email}`);
  } catch (err) {
    console.error(`Lỗi khi gửi email chào mừng đến ${user.email}:`, err);
  }
});