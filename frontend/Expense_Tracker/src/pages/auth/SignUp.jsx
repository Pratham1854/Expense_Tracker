import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import UploadImage from '../../utils/UploadImage';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateuser } = useContext(UserContext);
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  setError('');

  if (!fullname) {
    setError('Please enter full name');
    return;
  }

  if (!validateEmail(email)) {
    setError('Enter valid email');
    return;
  }

  if (!password) {
    setError('Enter password');
    return;
  }

  let profileimageurl = '';
  setLoading(true);

  try {
    if (profilepic) {
      console.log('Uploading image...');
      const imguploadres = await UploadImage(profilepic);
      console.log('Upload response:', imguploadres);

      if (!imguploadres.imageUrl) {
        throw new Error('Image upload failed or missing imageUrl');
      }

      profileimageurl = imguploadres.imageUrl;
    }

    console.log('Calling register API...');
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName: fullname,
      email,
      password,
      profileImageUrl: profileimageurl
    });

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      updateuser(user);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Register error:', error);

    if (error.response && error.response.data?.message) {
      setError(error.response.data.message);
    } else if (error.response) {
      setError(error.response.statusText || 'Server error');
    } else if (error.request) {
      setError('No response from server');
    } else {
      setError('Something went wrong');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilepic} setimage={setProfilepic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'SIGN UP'}
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link
              className="font-medium text-primary underline"
              to="/login"
            >
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
