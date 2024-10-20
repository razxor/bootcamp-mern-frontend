import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import { Course } from "../components/Course";
import { Hero } from "../components/Hero";
import { HIW } from "../components/HIW";
import ProductImages from "../components/ProductImages";
import { About } from "./About";

const Home = () => {
    return (
        <>
            <Hero />                        
            <ProductImages />
            <HIW />
            <ContactUs />
            <AboutUs />
        </>
    )
}

export default Home;
