import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/api/addProduct", "/api/getProduct", "/api/order", "/api/getProductById", "/api/createStore", "/api/addSize", "/api/getSize", "/api/getSizeById", "/api/deleteSize"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
