import { useEffect, useState } from 'react'
import api from '../config/api'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, productsRes, categoriesRes] = await Promise.all([
        api.get('/api/admin/dashboard'),
        api.get('/api/products?size=100'),
        api.get('/api/categories'),
      ])
      setStats(statsRes.data.data)
      setProducts(productsRes.data.data.content)
      setCategories(categoriesRes.data.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/admin/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
      })
      toast.success('Product created successfully')
      setShowProductForm(false)
      setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' })
      fetchDashboardData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await api.delete(`/api/admin/products/${id}`)
      toast.success('Product deleted')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
        <div className="card bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 sm:p-6">
          <p className="text-xs sm:text-sm opacity-90">Total Users</p>
          <p className="text-2xl sm:text-4xl font-bold">{stats?.totalUsers}</p>
        </div>
        <div className="card bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sm:p-6">
          <p className="text-xs sm:text-sm opacity-90">Total Products</p>
          <p className="text-2xl sm:text-4xl font-bold">{stats?.totalProducts}</p>
        </div>
        <div className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6">
          <p className="text-xs sm:text-sm opacity-90">Total Orders</p>
          <p className="text-2xl sm:text-4xl font-bold">{stats?.totalOrders}</p>
        </div>
        <div className="card bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 sm:p-6">
          <p className="text-xs sm:text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl sm:text-4xl font-bold">${stats?.totalRevenue?.toFixed(2)}</p>
        </div>
      </div>

      {/* Product Management */}
      <div className="card mb-8 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Product Management</h2>
          <button
            onClick={() => setShowProductForm(!showProductForm)}
            className="btn-primary text-sm sm:text-base w-full sm:w-auto"
          >
            {showProductForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showProductForm && (
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Product Name"
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                required
                step="0.01"
                className="input-field"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stock"
                required
                className="input-field"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
              <select
                required
                className="input-field"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="Image URL"
                className="input-field sm:col-span-2"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="input-field sm:col-span-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary mt-4 w-full sm:w-auto">
              Create Product
            </button>
          </form>
        )}

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Product</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Price</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Stock</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Category</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">{product.name}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">${product.price}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">{product.stock}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm">{product.categoryName}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
