import { useEffect, useState } from 'react'
import api from '../config/api'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    page: 0,
    size: 12,
  })
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories')
      setCategories(response.data.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.categoryId) params.append('categoryId', filters.categoryId)
      params.append('page', filters.page)
      params.append('size', filters.size)

      const response = await api.get(`/api/products?${params}`)
      setProducts(response.data.data.content)
      setTotalPages(response.data.data.totalPages)
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">All Products</h1>

      {/* Filters */}
      <div className="card mb-6 sm:mb-8 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 0 })}
          />
          <select
            className="input-field"
            value={filters.categoryId}
            onChange={(e) => setFilters({ ...filters, categoryId: e.target.value, page: 0 })}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center mt-8 sm:mt-12 gap-3 sm:gap-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 0}
                className="btn-secondary disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700 text-sm sm:text-base">
                Page {filters.page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page >= totalPages - 1}
                className="btn-secondary disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
