import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/api/addProduct", "/api/getProduct", "/api/order", "/api/getProductById", "/api/getCategory", "/api/addCategory", "/api/deleteCategory"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
