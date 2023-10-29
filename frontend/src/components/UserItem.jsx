import { Link } from "react-router-dom"

function UserItem({user}) {
  return (
    <div className="user">
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div className={`status status-${user.isAdmin}`}>{user.isAdmin ? 'Admin' : 'Customer'}</div>
    </div>
  )
}
export default UserItem