export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path !== "/password" &&
    process.client &&
    sessionStorage.getItem("code")
  ) {
    sessionStorage.removeItem("code");
    return;
  }
  if (
    to.path === "/password" &&
    process.client &&
    !sessionStorage.getItem("code")
  ) {
    return navigateTo({ path: "/account" });
  }
  return;
});
