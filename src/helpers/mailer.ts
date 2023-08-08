import nodemailer from 'nodemailer';
import User from '@/models/userModal';
import bcryptjs from 'bcryptjs';

//send mail
export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpirey: Date.now() + 3600000,
      });
    } else if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyExpirey: Date.now() + 3600000,
      });
    }
    //transporter
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f8c169b9bf1f09',
        pass: 'PASS',
      },
    });

    const mailOptions = {
      from: 'rohit32@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `
      <p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      }</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new error.message();
  }
};
