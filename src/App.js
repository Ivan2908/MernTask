import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectosState';
import TareaState from './context/Tareas/tareaState';
import AlertaState from './context/alerts/alertaState';
import AuthState from './context/autenticacion/authState';

import tokenAuth from './config/token';
import PriveRoute from './components/rutas/PrivateRoute';
 
import './App.css';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component= { Login } />
                <Route exact path="/nueva-cuenta" component= { NuevaCuenta } />
                <PriveRoute exact path="/proyectos" component= { Proyectos } />
              </Switch>
            </Router>
          </AuthState>  
        </AlertaState>  
      </TareaState>
    </ProyectoState>
  );
}

export default App;
