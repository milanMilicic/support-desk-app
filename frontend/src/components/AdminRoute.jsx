import {useAdminStatus} from '../hooks/useAdminStatus'
import {Navigate, Outlet} from 'react-router-dom'
import Spinner from '../components/Spinner'

function AdminRoute() {
  const {isAdmin, checkingStatus} = useAdminStatus();

  if(checkingStatus){
    return <Spinner />
  }

  return isAdmin ? <Outlet /> : <Navigate to='/login' />
}
export default AdminRoute