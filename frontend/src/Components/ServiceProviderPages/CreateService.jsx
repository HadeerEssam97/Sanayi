import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function CreateListingPage() {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)

  const locations = ['Cairo', 'Alexandria', 'Giza']
  const jobTitles = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Gardener', 'HVAC Technician']

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    location: Yup.string().required('Location is required'),
    tags: Yup.string().required('At least one tag is required'),
    image: Yup.mixed().required('Image is required')
  })

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      description: '',
      price: '',
      location: '',
      tags: '',
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
      navigate('/Listing')
    },
  })

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0]
    formik.setFieldValue('image', file)
    setPreviewImage(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-emerald-300">Create New Listing</h2>

        <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-emerald-300 mb-1">Job Title</label>
            <select
              id="jobTitle"
              name="jobTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobTitle}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select a job title</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            {formik.touched.jobTitle && formik.errors.jobTitle ? (
              <div className="text-red-500 mt-1">{formik.errors.jobTitle}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-emerald-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 mt-1">{formik.errors.description}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-emerald-300 mb-1">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 mt-1">{formik.errors.price}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-emerald-300 mb-1">Location</label>
            <select
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 mt-1">{formik.errors.location}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-emerald-300 mb-1">Tags (comma-separated)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tags}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formik.touched.tags && formik.errors.tags ? (
              <div className="text-red-500 mt-1">{formik.errors.tags}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-emerald-300 mb-1">Service Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 mt-1">{formik.errors.image}</div>
            ) : null}
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 rounded-md max-h-40 object-cover" />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  )
}