import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbconfig";
import { cookies } from "next/headers";
import { UserModel } from "../users.model";



export async function POST(req: NextRequest,) {
    await connect();
    console.log('logout POST');


    let cookieStore = await cookies();
    let token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ message: "Not logged in", status: 401 });
    }

    let tokenValue = token?.value;

    let User = await UserModel.findOne({ verifyToken: tokenValue });
    cookieStore.set('token', '', { maxAge: 0 });
    return NextResponse.json({ status: 200, message: "Logged out" });

}