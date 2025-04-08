// app/profile/SellerPanel.tsx
'use client'

import { useState } from 'react'

export default function SellerPanel({ sellerId }: { sellerId: string }) {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [phone, setPhone] = useState('123-456-7890')
  const [editing, setEditing] = useState(false)

  const handleSave = () => {
    // Here you would call your API to save the updated data
    setEditing(false)
    console.log('Saved info:', { name, email, phone })
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">👤 Public Info</h2>
      <div className="space-y-3 bg-white p-4 rounded shadow">
        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              placeholder="Email"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full"
              placeholder="Phone"
            />
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          </>
        )}
      </div>
    </section>
  )
}
