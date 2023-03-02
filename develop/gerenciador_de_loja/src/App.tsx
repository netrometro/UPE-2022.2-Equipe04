import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <h1>Gerenciador de estoque</h1>
        <h2>Loja de roupas</h2>
      </div>
      <div>
      </div>
      <div className="wrapper">
         <div className="form-container">
          <div className='login-box'>
            <div className="title"><AccountCircleRoundedIcon></AccountCircleRoundedIcon>Login</div>
              <div className="form-inner">
                <form action="#" className="login">
                    <div className="field">
                      <input className="field-input" type="text" placeholder="Email" required></input>
                    </div>
                    <div className="field">
                      <input className="field-input" type="password" placeholder="Senha" required></input>
                    </div>
                    <div className="pass-link">
                      <a href="#">Esqueceu a senha?</a>
                    </div>
                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input className='field-login' type="submit" value="Entrar"></input>
                    </div>
                </form>               
              </div>
          </div>
          
         </div>
      </div>
      {/* <div classNameName="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p classNameName="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
    
  )
}

export default App
