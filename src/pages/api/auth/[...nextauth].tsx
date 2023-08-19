import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from "next-auth/providers/linkedin";



export const authOptions = {
    providers:[
       
        GitHubProvider({
            clientId: '4e41b33677584de273df',
            clientSecret: 'dc6bc20e0ea7978e9289236354c78d96cc2fc152'
          })
    ]
}
export default NextAuth(authOptions)