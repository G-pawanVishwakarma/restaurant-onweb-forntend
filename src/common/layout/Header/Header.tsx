import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex flex-wrap justify-start items-center bg-gray-800 p-4">
      <Link href="/user" className="text-black px-4 py-2 hover:bg-gray-700 rounded-md transition">
        Users
      </Link>
      <Link href="/order-source" className="text-black px-4 py-2 hover:bg-gray-700 rounded-md transition">
        Order Source
      </Link>
      <Link href="/payment-method" className="text-black px-4 py-2 hover:bg-gray-700 rounded-md transition">
        Payment Method
      </Link>
      <Link href="/postcode" className="text-black px-4 py-2 hover:bg-gray-700 rounded-md transition">
        Postcode
      </Link>
      <Link href="/orders" className="text-black px-4 py-2 hover:bg-gray-700 rounded-md transition">
        Orders
      </Link>
    </div>
  )
}

export default Header

