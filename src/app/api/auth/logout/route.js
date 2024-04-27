import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
export const GET = async (request) => {
  let token = request.cookies.get("token");

  cookies().delete("token");
  return NextResponse.json({
    success: true,
    message: "Logout Successfully",
  });
};
