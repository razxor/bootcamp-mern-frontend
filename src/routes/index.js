export const ROUTES = {    
    LOGIN: "/login",
    REGISTER: "/signup",
    HOME: "/",
    COURSES: "/courses",
    ABOUT: "/about",
    BLOG: "/blog",
    FAQ: "/faq",
    SINGLE_COURSE:{
        STATIC: "/course/:id",
        DYNAMIC: (id)=>`/course/${id}`,
    },
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_USERS: "/admin/users",
    //ADMIN_USERS_ADD: "/admin/user/add",
    ADMIN_PRODUCTS: "/admin/products",
    ADMIN_CATEGORIES: "/admin/categories",
};

export default ROUTES;