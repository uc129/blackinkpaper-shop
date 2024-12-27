import { NextRequest, NextResponse } from "next/server";
import { IUser, UserModel } from "../users.model";
import bcrypt from "bcrypt";
import { connect } from "../../dbconfig";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest,) {
    await connect();

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Please fill in all fields", status: 400 });
    }

    // Check if user already exists
    const user: IUser | null = await UserModel.findOne({ email: email });
    if (!user) {
        return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return NextResponse.json({ error: "Invalid password", status: 400 });
    }

    const tokenData = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }

    // Create and assign token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!);
    user.verifyToken = token;
    user.verifyTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const response = NextResponse.json({ token: token, status: 200, message: 'Login successful', user: tokenData });


    response.cookies.set('token', token, {
        httpOnly: true,
        name: 'token',
        value: token,
        expires: new Date(Date.now() + 60 * 60 * 1000)
    });
    req.cookies.set('token', token)

    return response;

}