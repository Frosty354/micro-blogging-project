import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


export const authOptions = {
    providers:[
       
        GitHubProvider({
            //@ts-ignore
            clientId: process.env.GITHUB_ID,
            //@ts-ignore
            clientSecret: process.env.GITHUB_SECRET,
          }),
          GoogleProvider({
            //@ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            //@ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          // FacebookProvider({
          //   //@ts-ignore
          //   clientId: process.env.FACEBOOK_CLIENT_ID,
          //   //@ts-ignore
          //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          // })
    ]
}
export default NextAuth(authOptions)