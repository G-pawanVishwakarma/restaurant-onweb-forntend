/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
// Material UI Imports
import { Alert, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Payment {
  id: number;
  name: string;
  description: string;
  sequence: number;
  isActive: boolean;
}

const PaymentList: FC = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Handle add payment method navigation
  const handleAddPaymentMethod = () => {
    router.push('/payment-method/add-payments');
  };

  // Handle edit payment method navigation
  const handleEditPaymentMethod = (payment: Payment) => {
    router.push(`/payment-method/edit-payments?id=${payment.id}`);
  };

  // Fetch payment methods from the Strapi API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          router.push('/login'); // Redirect to login if no token
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/payment-methods`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }

        const data = await response.json();
        setPaymentList(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [router]);

  // Handle Delete
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this payment method?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/payment-methods/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }

      setPaymentList(prevList => prevList.filter(p => p.id !== id));
      setSuccessMessage('Payment deleted successfully!');
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
      {/* Header with Title and Button */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" fontWeight="bold">Payment Methods</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPaymentMethod}
        >
          Add Payment Method
        </Button>
      </div>

      {/* Success and Error Alerts */}
      {successMessage && (
        <Alert severity="success" className="mb-4">
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="min-w-full" aria-label="payment methods table">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paymentList.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.sequence}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {/* Edit Button */}
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditPaymentMethod(payment)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(payment.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentList;
