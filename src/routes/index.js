export const ROUTES = {    
    LOGIN: "/login",
    REGISTER: "/signup",
    HOME: "/",
    COURSES: "/products",
    ABOUT: "/about",
    BLOG: "/blog",
    FAQ: "/faq",
    SINGLE_COURSE:{
        STATIC: "/product/:id",
        DYNAMIC: (id)=>`/product/${id}`,
    },

    USER: "/user",
    USER_DASHBOARD: "/user/dashboard",        
    PURCHASED_PRODUCTS: "/user/orders",    


    ADMIN: "/admin",
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_USERS: "/admin/users",    
    ADMIN_PRODUCTS: "/admin/products",
    ADMIN_CATEGORIES: "/admin/categories",
};

export default ROUTES;