import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Navbar = () =>  {

  const [openDialog, setOpenDialog] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const navigate = useNavigate()

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const logout = () => {
    handleOpenDialog();
  };

  const handleLogoutConfirmed = () => {
    console.log('Before logout:', localStorage.getItem('token'));
    localStorage.setItem('token', '');
    localStorage.clear();
    console.log('After logout:', localStorage.getItem('token'));
    navigate('/');
    setOpenDialog(false); // Fermer la boîte de dialogue après la déconnexion
  };

  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Lareact
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/pictures/new">
                    Poster une photo
                  </Link>
                </li >
                <li className='nav-item active'>
                  <span className='nav-link'>Bonjour, {user?.name} </span>
                </li>
                <li className="nav-item">
                  <button className="btn" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Déconnexion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleLogoutConfirmed} color="primary" autoFocus>
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar
