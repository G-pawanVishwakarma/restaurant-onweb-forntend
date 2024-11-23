'use client'

import { useState } from 'react';
import Container from '@/common/layout/Container';

const AddPayment = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sequence, setSequence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !sequence) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const token = localStorage.getItem('jwtToken');  // Assuming token is stored in localStorage
    if (!token) {
      setError('You must be logged in to add a payment');
      setLoading(false);
      return;
    }

    const paymentData = {
      data: {
        name,
        description,
        sequence: parseInt(sequence),
      },
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/payment-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment');
      }

      const result = await response.json();
      console.log('Payment added successfully:', result);

      setName('');
      setDescription('');
      setSequence('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="pc-container flex-grow bg-gray-100 p-6">
        <header className="pc-header">
          <div className="header-wrapper flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Add New payment</h2>
          </div>
        </header>
        <Container>
          <div className="pc-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="card-body p-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Name Field */}
                      <div className="mb-4">
                        <label className="form-label text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                          className="form-control w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Name"
                        />
                      </div>

                      {/* Description Field */}
                      <div className="mb-4">
                        <label className="form-label text-sm font-medium text-gray-700">Description</label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                          className="form-control w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Description"
                        />
                      </div>

                      {/* Sequence Field */}
                      <div className="mb-4">
                        <label className="form-label text-sm font-medium text-gray-700">Sequence</label>
                        <input
                          type="number"
                          value={sequence}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSequence(e.target.value)}
                          className="form-control w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Sequence"
                        />
                      </div>

                      {/* Error message */}
                      {error && (
                        <div className="text-red-500 text-sm mb-4">
                          {error}
                        </div>
                      )}

                      {/* Actions Section */}
                      <div className="text-right mt-4">
                        <button className="btn btn-outline-secondary mr-2 px-6 py-2 rounded-lg border border-gray-300 text-gray-700">
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className={`btn px-6 py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                          disabled={loading}
                        >
                          {loading ? 'Adding payment...' : 'Add New payment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddPayment;
