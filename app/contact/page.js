"use client";
import React from 'react';

const ContactPage = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-screen-md mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Let's <span className="text-blue-500">Connect</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have a question about funding your project? Want to report a bug?
            Or just want to say hi? Drop us a message below!
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="shadow-sm bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="How can we help you?"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
              Your Message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-3 w-full text-sm text-white bg-gray-800 rounded-lg shadow-sm border border-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 transition-all"
          >
            Send Message
          </button>
        </form>

        {/* Social Links / Alternative Contact */}
        <div className="mt-12 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-400 mb-4">Or connect with us on social media</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Discord</span>
              Discord
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;