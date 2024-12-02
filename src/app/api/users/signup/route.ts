import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../users.model";
import bcrypt from "bcrypt";
import { connect } from "../../dbconfig";



export async function POST(req: NextRequest,) {
    await connect();

    let { firstName, lastName, email, phone, password, confirmPassword } = await req.json();

    console.log(firstName, lastName, email, phone, password, confirmPassword);


    if (!firstName || !lastName || !email || !phone || !password) {
        return NextResponse.json({ error: "Please fill in all fields", status: 400 });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
        return NextResponse.json({ error: "User already exists", status: 400 });
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email", status: 400 });
    }

    // Check if password is valid
    if (password.length < 4) {
        return NextResponse.json({ error: "Password must be at least 4 characters", status: 400 });
    }

    // Check if password and confirmPassword match


    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    const newUser = new UserModel({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
    });


    try {
        await newUser.save();
    }
    catch (err) {
        return NextResponse.json({ error: "Something went wrong", status: 500 });
    }


    return NextResponse.json({ message: "User created successfully", status: 201 });
}