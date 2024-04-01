import { Routes, Route } from 'react-router-dom'
import { Cart, Category, EditProfile, EventRestric, Home, Login, News, NotFound, ProductDetail, ProductEvent, Profile, Search, SignUp, WishList } from './pages'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Splash from './components/Splash'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { resetItem } from './features/cart/cartSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const HomePage = lazy(() =>
  delayForSplash(import('./components/Layout'))
);

async function delayForSplash(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promise;
}

function App() {
  const [inputData, setInputData] = useState({})
  const { authUser } = useAuthContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signIn = async ()=>{
    const scopes = ['username', 'payments'];
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    const accessToken = {
      accessToken: authResult.accessToken,
      uid: authResult.user.uid
    }
    localStorage.setItem('token', JSON.stringify(accessToken));
  };

  useEffect(() => {
    signIn()
  },[])

  const orderProduct = async (memo,amount, paymentMetaData) => {
    const paymentData = {
      memo,
      amount,
      metadata:paymentMetaData
    };
    const callback ={
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    
    await window.Pi.createPayment(paymentData, callback);
    setInputData({
      memo,
      totalPrice: amount,
      quantity: paymentData.metadata.paymentData.quantity,
      address: paymentData.metadata.paymentData.address,
      username: paymentData.metadata.paymentData.username
  })
  dispatch(resetItem())
  };

  const onIncompletePaymentFound = async (payment) => {
    await fetch(`https://api.minepi.com/v2/payments/${payment.identifier}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${import.meta.env.VITE_API_KEY}`
      },
      body: JSON.stringify({ txid: payment.transaction.txid })
    });
  };

  const onReadyForServerApproval = async (paymentId) => {
    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${import.meta.env.VITE_API_KEY}`
      }
    })
  };

  const onReadyForServerCompletion = async (paymentId, txid) => {
    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${import.meta.env.VITE_API_KEY}`
      },
      body: JSON.stringify({ txid })
    });
    console.log(inputData)
    if(inputData){
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, inputData);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }
    navigate('/profile')
  };

  const onCancel = async (paymentId) => {
    console.log('onCancel', paymentId)
  }

  const onError = async (error) => {
    console.log('onError', error)
    toast.error(error.message)
  }
  return (
    <>
    <Routes>
      <Route
          path="/"
          element={
            <Suspense fallback={<Splash />}>
              <HomePage />
            </Suspense>
          }>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />}/>
      <Route path='/cart' element={<Cart orderProduct={orderProduct} />}/>
      <Route path="/product/:id" element={<ProductDetail />}/>
      <Route path="/wishlist" element={<WishList />}/>
      <Route path="/event" element={<EventRestric />}/>
      <Route path="/productEvent" element={<ProductEvent />}/>
      <Route path="/search/:query" element={<Search />}/>
      <Route path="/category/:category" element={<Category />}/>
      </Route>
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login signIn={signIn} />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp signIn={signIn} />} />
      <Route path="/profile/:id" element={authUser ? <EditProfile /> : <Navigate to="/login" /> } />
      <Route path="/news" element={<News />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
