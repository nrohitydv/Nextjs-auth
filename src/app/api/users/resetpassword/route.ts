import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModal';
import { NextRequest, NextResponse } from 'next/server';
import bycryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpirey: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpirey = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
