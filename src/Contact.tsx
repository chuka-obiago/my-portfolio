import React, { useState, useEffect, useRef } from 'react';

// Define the types for the form data and the error object
interface FormData {
  name: string;
  email: string;
  message: string;
}

// The index signature [key: string]: string | undefined;
// allows the object to be indexed dynamically.
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: string | undefined;
}

// This is the modern way to manage metadata in Next.js
export const metadata = {
  title: 'Get in Touch ',
  description: 'Contact form for your portfolio.',
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);

  // Animation state and ref
  const [isVisible, setIsVisible] = useState(false);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 50% of the element is visible
      }
    );

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    // Cleanup function
    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for the current field as the user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): FormErrors => {
    let newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate a successful form submission
      console.log('Form data submitted:', formData);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className=" min-h-screen py-16 flex justify-center items-center">
      <div
        ref={contactSectionRef}
        className={`container mx-auto px-4 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-12">
          GET IN TOUCH
        </h1>

        <div className="flex justify-center">
          <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 transition duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 transition duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 transition duration-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center m-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Message Sent!
            </h3>
            <p className="text-gray-700 mb-6">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;