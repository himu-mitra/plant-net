import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Plant'
        address='/dashboard/seller/add-plant'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='/dashboard/seller/my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='/dashboard/seller/manage-orders'
      />
    </>
  )
}

export default SellerMenu
