'use client'

import { useState } from 'react'
import SellerPanel from './SellerPanel'
import ProductCard from '../components/ProductCard'
import { productsObject } from '../lib/temporalData'

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '123-456-7890',
    isSeller: false, // <-- change this manually to true/false for now
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    alert('Changes saved!')
  }

  const favoriteProducts = productsObject.filter(p => [7, 12, 19].includes(p.id))

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">My Info</h2>
        <form className="grid grid-cols-1 gap-4">
          <input type="text" name="name" value={user.name} onChange={handleChange} className="border p-2 rounded" />
          <input type="email" name="email" value={user.email} onChange={handleChange} className="border p-2 rounded" />
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="border p-2 rounded" />
          <button type="button" onClick={handleSave} className="bg-blue-600 text-white p-2 rounded">Save Changes</button>
        </form>
      </section>

      {/* 🔄 Conditionally render seller or user view */}
      {user.isSeller ? (
        <>
          <h2 className="text-xl font-bold">My Products</h2>
          <SellerPanel sellerId="207" />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">My Favs ❤️</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

