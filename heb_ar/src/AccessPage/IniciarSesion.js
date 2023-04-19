import './IniciarSesion.css';

function IniciarSesion() {
  return (
    <div className="container">
        <div className='rectAngle'></div>
        <div className="column">
            <h1 className="IniciarSesion">Iniciar Sesión</h1>
            <input placeholder="Correo electrónico"></input>
            <input placeholder="Contraseña"></input>
            <a href="/OlvidasteContra" className='OlvidasteContra'>¿Olvidaste tu contraseña?</a>
            <button className='IniciarButton'>Iniciar sesión</button>
            <button className='CrearCuenta'>Crear cuenta</button>
            <p>O continua con</p>
            <button className='ContConGoogle'>Continuar con Google</button>
        </div>
    </div>
  );
}

export default IniciarSesion;