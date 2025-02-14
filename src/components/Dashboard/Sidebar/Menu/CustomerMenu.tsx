import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Orders'
        address='/dashboard/customer/my-orders'
      />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-5 py-3 my-3 rounded-lg transition-all duration-300 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />
        <span className='ml-4 font-medium'>Become A Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default CustomerMenu;
