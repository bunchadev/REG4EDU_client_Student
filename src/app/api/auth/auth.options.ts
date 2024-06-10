import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from "next-auth"
import { sendRequest } from "@/utils/api"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "TrungDev",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/signin`,
                    method: "POST",
                    body: { username: credentials?.username, password: credentials?.password }
                })
                if (res && res.data) {
                    return res.data as any
                } else {
                    throw new Error("can not login" as string)
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            // if (trigger === "signIn" && account?.provider !== "credentials") {
            //     const res = await sendRequest<IBackendRes<JWT>>({
            //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
            //         method: "POST",
            //         body: { type: account?.provider.toLocaleUpperCase(), username: user.email },
            //     })
            //     if (res.data) {
            //         token.access_token = res.data?.access_token
            //         token.refresh_token = res.data?.refresh_token
            //         token.user = res.data?.user
            //     }
            // }
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token
                //@ts-ignore
                token.refresh_token = user.refresh_token
                //@ts-ignore
                token.user = user.user
            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
            }
            return session
        },
    },
    // pages: {
    //     signIn: 'auth/signin'
    // }
}