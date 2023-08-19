import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from "next-auth/providers/linkedin";



export const authOptions = {
    providers:[
       
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
    ]
}
export default NextAuth(authOptions)