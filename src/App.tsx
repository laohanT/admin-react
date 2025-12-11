import { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import { getPublickKey } from './api/public';
import { useDispatch } from 'react-redux';
import { setPublicKey } from './store/slice/cryptoSlice';
import router from './router/routes';
function App() {
  const dispatch = useDispatch()
  // 获取rsakey
  const fetchRsaKey = async () => {
    const res = await getPublickKey()
    dispatch(setPublicKey(res.data.pubKey))
  }
  useEffect(() => {
    fetchRsaKey()
  }, [])
  return <RouterProvider router={router} />

}
export default App;

