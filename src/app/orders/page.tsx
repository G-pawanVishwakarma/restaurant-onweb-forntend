/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';

interface order {
  id: number;
  Name: string;
  Description: string;
  Sequence: number;
  isActive: boolean;
}

const Orders: FC = () => {
  const [orderList, setorderList] = useState<order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch order methods from the Strapi API
  useEffect(() => {
    const fetchorders = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage (or sessionStorage)
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/order-sources`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order methods');
        }

        const data = await response.json();
        setorderList(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchorders();
  }, []);

  // Handle Edit
  const handleEdit = async (order: order) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found');
      return;
    }

    const updatedorder = {
      ...order,
      name: `${order.id} Cards` // Example of updating the name
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/order-methods/:${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
        },
        body: JSON.stringify({ data: updatedorder }),
      });

      // console.log(`${process.env.NEXT_PUBLIC_API_URL}api/order-methods/:${order.id}`);

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      const data = await response.json();
      setorderList(prevList =>
        prevList.map(p => (p.id === order.id ? data.data : p))
      );
      setSuccessMessage('order updated successfully!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle Delete
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this order method?');
    if (!confirmed) return;

    try {
      // Fix: Use correct endpoint by replacing ':id' with the actual ID
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/order-sources/:${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Add JWT token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Update the frontend state by filtering out the deleted order
      setorderList(prevList => prevList.filter(p => p.id !== id));

      setSuccessMessage('order deleted successfully!');
    } catch (error: any) {
      setError(error.message);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">order Methods List</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <AddIcon className="text-white" />
          <span>Add order</span>
        </button>
      </div>

      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Sequence</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{order.id}</td>
                <td className="px-4 py-2">{order.Name}</td>
                <td className="px-4 py-2">{order.Description}</td>
                <td className="px-4 py-2">{order.Sequence}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-evenly space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(order)}>
                      <EditIcon />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(order.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
