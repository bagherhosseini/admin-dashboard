import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/api/addProduct", "/api/getProduct", "/api/order", "/api/getProductById", "/api/addSize", "/api/getSize", "/api/getSizeById"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
