import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
interface IUser {
      studentId: string,
      userName: string,
      email: string,
      password: string,
      numberOfCredits: number,
      status: string,
      majorsId: string,
}
declare module "next-auth/jwt" {
    interface JWT {
        access_token: string,
        refresh_token: string,
        user: IUser
    }
}
declare module "next-auth" {
    interface Session {
        access_token: string,
        refresh_token: string,
        user: IUser
    }

}