import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#02474D'}}>
        <div className="container">
          <NavLink className="navbar-brand" to={"/"}>SK's Blog</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to={"/"} activeClassName="active" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/post'} activeClassName="active">Posts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/admin'} activeClassName="active">Admin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" target='_blank' to={'https://sathishkumarm.me/'}>Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
