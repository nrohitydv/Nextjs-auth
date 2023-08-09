import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModal';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 400 }
      );
    }

    if (user) {
      await sendEmail({ email, emailType: 'RESET', userId: user._id });
    }

    return NextResponse.json({
      success: true,
      message: 'Recovery email sent. Please check your email',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
