import { useState, useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"


function NewTicket() {
  const {user} = useSelector(state => state.auth);
  const {isLoading, isError, isSuccess, message} = useSelector(state => state.ticket)
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("PlayStation 5");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({product, description}));
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>

      <BackButton url='/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the new form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} disabled className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" value={email} disabled className="form-control" />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="product" id="product" onChange={e => setProduct(e.target.value)} value={product}>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="Xbox Series X|S">Xbox Series X|S</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="PC">PC</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} className="form-control"></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket