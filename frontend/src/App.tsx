import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Index from './pages';
import { connectWallet, setAccount } from 'features/votes/vote-slice/vote.slice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const connectWalletAndSetAccount = async () => {
    const account = await connectWallet()
    dispatch(setAccount(account))
  }

  useEffect(() => {
    connectWalletAndSetAccount()
  }, [])
  return (
      <Routes>
        <Route index element={<Index />}></Route>
        {/* <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}
      </Routes>
  )
}

export default App
