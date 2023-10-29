import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getUsers, reset} from '../features/users/userSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import UserItem from "../components/UserItem"

function Users() {
    const {users, isLoading, isSuccess} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if(isSuccess){  //kada zelimo da uradimo nesto kada se komponenta unmountuje, onda u useEffectu radimo return
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <BackButton url='/' />
        <h1>Users</h1>
        <div className="users">
            <div className="user-headings">
                <div>Name</div>
                <div>Email</div>
                <div>Status</div>
            </div>
            {users.map(user => (
                <UserItem key={user._id} user={user}/>
            ))}
        </div>
    </>
  )
}
export default Users