import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import { adsignInStart, adsignInSuccess, adsignInFailure } from '../redux/admin/adminSlice.js'; 
const AdminLogin = () => {
  const Navigate=useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(adsignInStart());
        const res = await fetch('/api/auth/adlogin', {
        method: 'POST',
         headers: {
         'Content-Type': 'application/json',
             },
             body: JSON.stringify(formData),
            });
             const data = await res.json();
            
             if (data.success === false) {
              dispatch(adsignInFailure(data));
                return;
              }
              dispatch(adsignInSuccess(data));
              Navigate('/admin-home');
        } catch (error) {
          dispatch(adsignInFailure(error)); 
        }
        
         
      }
  return (
    <div className='p-3 max-w-lg mx-auto'>

     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/admin-login'>
        <h1 className='font-bold'>Admin Auth</h1>
        </Link>
        <ul className='flex gap-4'>
        <Link to='/admin-login'>
            <li>Home</li>
            </Link>
            
         
        </ul>
        </div>



    <h1 className='text-3xl text-center font-semibold my-7'>Admin Login</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
       
        <input
      type='email'
      placeholder='Email'
      id='email'
      className='bg-slate-100 p-3 rounded-lg'
      onChange={handleChange}
    />

       <input
      type='password'
      placeholder='Password'
      id='password'
      className='bg-slate-100 p-3 rounded-lg'
      onChange={handleChange}
      />

      <button 
      disabled={loading}
     
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    >
    {loading ? 'Loading...' : 'Sign in'}
    </button>

    </form>
   
  <p className='text-red-700 mt-5'>{error ? error.message ||'Something went wrong!':''}</p>
</div>
  )
}

export default AdminLogin
