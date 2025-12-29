import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                await connectDb();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    // Create a new user
                    await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                    });
                }
                return true;
            }
            return true;
        },

        async session({ session, user, token }) {
            await connectDb();
            const dbUser = await User.findOne({ email: session.user.email });

            if (dbUser) {
                session.user.name = dbUser.username;
            }
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
