'use server'
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../users.model";
import { connect } from "../../dbconfig";

export async function GET(req: NextRequest,) {
    await connect();

    const cookies = req.cookies;
    const token = cookies.get('token');


    if (!token) {
        console.log('no token');
        return NextResponse.json({ message: "Not authenticated, no token", status: 401 });
    }

    const tokenValue = token.value;
    const user = await UserModel.findOne({ verifyToken: tokenValue },
        'firstName lastName email isAdmin isVerified phone addresses avatar lastLogin  isDeleted createdAt updatedAt deletedAt');

    return NextResponse.json({ status: 200, message: "Authenticated", user: user });

}