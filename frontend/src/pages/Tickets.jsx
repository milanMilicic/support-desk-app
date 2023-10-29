import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getTickets, getAdminTickets, reset} from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TicketItem from "../components/TicketItem"

function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector(state => state.tickets);
    const {user} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if(isSuccess){  //kada zelimo da uradimo nesto kada se komponenta unmountuje, onda u useEffectu radimo return
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        {user.isAdmin ? dispatch(getAdminTickets()) : dispatch(getTickets())}
    }, [dispatch, user.isAdmin])

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        {tickets.length !== 0 ? (
        <div>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map(ticket => (
                    <TicketItem key={ticket._id} ticket={ticket}/>
            ))}
            </div>
        </div>
        ) : (
            <div>
                <BackButton url='/' />
                <h1>No new tickets</h1>
            </div>
    )}
    </>
  )
}
export default Tickets