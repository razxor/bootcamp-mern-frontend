import React from 'react';

const AboutUs = () => {
    return (
        <section className="about-us py-12 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    {/* Left Column: Author Image */}
                    <div className="avatar mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                        <div className="w-48 rounded">
                            <img src="../../images/raz.png" alt="Owner's Image" />
                        </div>
                    </div>

                    {/* Right Column: Author Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-semibold text-gray-700">Raz Ahamed</h3>
                        <p className="text-gray-600 mt-4 text-justify">
                            Raz Ahamed is a passionate educator and industry expert with over 12 years of experience in online education. Dedicated to empowering learners with high-quality, accessible courses, John created this platform to support your journey toward skill mastery and career growth. Join us and start learning with a community that’s here to help you succeed!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
