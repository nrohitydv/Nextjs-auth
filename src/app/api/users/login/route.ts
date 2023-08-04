import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModal';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    //user exist check
    const user = await User.findOne({ email });

    if (!user) {
      return (
        NextResponse.json({ error: 'user does not exit' }), { status: 400 }
      );
    }
    //check password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return (
        NextResponse.json({ error: 'password does not match' }),
        {
          status: 400,
        }
      );
    }
    //create token data
    const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });
    const response = NextResponse.json({
        message:'Login succesful',
        success:true,
    })
    response.cookies.set('token',token,{
        httpOnly: true,
        
    })
    return response;

    

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

