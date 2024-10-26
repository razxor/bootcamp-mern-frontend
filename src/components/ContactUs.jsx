import React from 'react';

const ContactUs = () => {
    return (
        <section className="contact-us py-12 bg-gray-100">
            <div className="max-w-lg mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
                <form className="space-y-4">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full h-32"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-success text-white w-full">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
