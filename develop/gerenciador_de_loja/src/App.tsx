import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

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
            <div className="form-inner">
               <form action="#" className="login">
                  <div className="field">
                     <input type="text" placeholder="Email Address" required></input>
                  </div>
                  <div className="field">
                     <input type="password" placeholder="Password" required></input>
                  </div>
                  <div className="pass-link">
                     <a href="#">Forgot password?</a>
                  </div>
                  <div className="field btn">
                     <div className="btn-layer"></div>
                     <input type="submit" value="Login"></input>
                  </div>
                  <div className="signup-link">
                     Not a member? <a href="">Signup now</a>
                  </div>
               </form>
               <form action="#" className="signup">
                  <div className="field">
                     <input type="text" placeholder="Email Address" required></input>
                  </div>
                  <div className="field">
                     <input type="password" placeholder="Password" required></input>
                  </div>
                  <div className="field">
                     <input type="password" placeholder="Confirm password" required></input>
                  </div>
                  <div className="field btn">
                     <div className="btn-layer"></div>
                     <input type="submit" value="Signup"></input>
                  </div>
               </form>
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
