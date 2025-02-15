"use client"

import { useState } from 'react'
import DeleteModal from '@/components/Modal/DeleteModal'

const SellerOrderDataRow = ({ orderData, refetch }:any) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <tr className='bg-white hover:shadow-md transition-shadow duration-300'>
      <td className='px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-900'>
        {orderData?.name || 'Unknown'}
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm text-gray-700'>
        {orderData?.email || 'N/A'}
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-900'>
        ${orderData?.price || '0.00'}
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm text-gray-700'>
        {orderData?.quantity || '0'}
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm text-gray-700'>
        {orderData?.location || 'Unknown'}
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm'>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            orderData?.status === 'Pending'
              ? 'bg-yellow-200 text-yellow-800'
              : orderData?.status === 'In Progress'
              ? 'bg-blue-200 text-blue-800'
              : 'bg-green-200 text-green-800'
          }`}
        >
          {orderData?.status || 'Pending'}
        </span>
      </td>
      <td className='px-6 py-4 border-b border-gray-200 text-sm'>
        <div className='flex items-center gap-4'>
          <select
            required
            className='p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 transition duration-200 bg-white text-emerald-600'
            name='status'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200'
          >
            Cancel
          </button>
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default SellerOrderDataRow
