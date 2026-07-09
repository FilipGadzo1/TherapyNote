import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!data.success) return null;
        return { ...data.data.user, tokens: data.data };
      },
    }),
  ],
  pages: { signIn: '/auth/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id?: string; tokens: { accessToken: string; refreshToken: string } };
        token.userId = u.id;
        token.accessToken = u.tokens.accessToken;
        token.refreshToken = u.tokens.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, id: token.userId as string };
      (session as unknown as { accessToken: string }).accessToken = token.accessToken as string;
      return session;
    },
  },
});
