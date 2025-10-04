// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token // endast inloggade släpps igenom
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/lists/:path*", "/wishlist/:path*"]
};
