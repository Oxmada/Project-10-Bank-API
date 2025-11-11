import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout, editUserProfile } from "../redux/UserSlice"
import Footer from "../components/Footer"
import logo from "../assets/argentBankLogo.png"
import { useState } from "react"

function profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { firstName, lastName } = useSelector((state) => state.user)

    const [isEditing, setIsEditing] = useState(false)
    const [newFirstName, setNewFirstName] = useState(firstName)
    const [newLastName, setNewLastName] = useState(lastName)
    const [error, setError] = useState(null)

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    const handleSave = () => {
        setError(null)
        dispatch(editUserProfile({ firstName: newFirstName, lastName: newLastName }))
            .unwrap()
            .then(() => setIsEditing(false))
            .catch((err) => setError(err))
    }

    const handleCancel = () => {
        setNewFirstName(firstName)
        setNewLastName(lastName)
        setIsEditing(false)
        setError(null)
    }

    return (
        <div>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="/user">
                        <i className="fa fa-user-circle"></i>
                        {firstName}
                    </Link>
                    <button className="main-nav-item sign-out-button" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </button>

                </div>
            </nav>

            <main className="main bg-dark">
                <div className="header">
                    {!isEditing ? (
                        <>
                            <h1>Welcome back<br />{firstName} {lastName}!</h1>
                            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                        </>
                    ) : (
                        <div className="edit-form">
                            <h1>Welcome back</h1>
                            <div className="edit-inputs">
                                <input
                                    type="text"
                                    value={newFirstName}
                                    onChange={(e) => setNewFirstName(e.target.value)}
                                    placeholder={firstName}
                                />
                                <input
                                    type="text"
                                    value={newLastName}
                                    onChange={(e) => setNewLastName(e.target.value)}
                                    placeholder={lastName}
                                />
                            </div>
                            <div className="edit-buttons">
                                <button className="edit-button" onClick={handleSave}>Save</button>
                                <button className="edit-button" onClick={handleCancel}>Cancel</button>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    )}
                </div>

                <h2 className="sr-only">Accounts</h2>

                {[
                    {
                        title: "Argent Bank Checking (x8349)",
                        amount: "$2,082.79",
                        desc: "Available Balance"
                    },
                    {
                        title: "Argent Bank Savings (x67124)",
                        amount: "$10,928.42",
                        desc: "Available Balance"
                    },
                    {
                        title: "Argent Bank Credit Card (x5201)",
                        amount: "$184.30",
                        desc: "Current Balance"
                    }
                ].map((account, i) => (
                    <section className="account" key={i}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">{account.amount}</p>
                            <p className="account-amount-description">{account.desc}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                ))}
            </main>

            <Footer />
        </div>
    )
}

export default profile



