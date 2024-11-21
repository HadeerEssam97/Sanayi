import React from 'react'

function Footer() {
  return (
    <footer className="bg-opacity-30 text-center py-8 mt-16 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <p className="text-green-100 mb-4">
            &copy; 2023 Sanayi. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-emerald-300 hover:text-emerald-100 transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-emerald-300 hover:text-emerald-100 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-emerald-300 hover:text-emerald-100 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer