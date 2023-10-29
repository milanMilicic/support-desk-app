import { FaQuestionCircle, FaTicketAlt, FaUsers  } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAdminStatus } from "../hooks/useAdminStatus";

function Home() {
  const {isAdmin} = useAdminStatus();

  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      {isAdmin ? (<Link to="/admin/users" className="btn btn-reverse btn-block">
        <FaUsers /> View users
      </Link>) : (<Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create new ticket
      </Link>)}

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View {isAdmin ? '' : 'my'} tickets
      </Link>
    </>
  )
}
export default Home