import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify'
import { getAdditionalUserInfo } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';






function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            // Sign in the user with the provided email and password
            await signInWithEmailAndPassword(auth, email, password);

            // Optionally, you can redirect to a different page after successful login
            navigate('/home');
        } catch (error) {
            console.error('Error signing in:', error.message);

            // Show error notification for wrong email or password
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                toast.error('Wrong email or password!', { position: 'top-right' });
            } else {
                toast.error('Error signing in!', { position: 'top-right' });
            }
        }
    };
    const googleSignIn = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const additionalUserInfo = getAdditionalUserInfo(result);

            // Check if the user is newly created
            if (additionalUserInfo.isNewUser) {
                // Save user information in Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    // Add other user information as needed
                };

                try {
                    await setDoc(userDocRef, userData, { merge: true });
                    console.log('User data saved successfully!');
                  } catch (error) {
                    console.error('Error saving user data:', error);
                  }

            }

            navigate('/home');
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
            toast.error('Error signing in!', { position: 'top-right' });
        }
    };
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample" />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-center md:text-left">
                    <label className="mr-1">Sign in with : </label>
                    <button onClick={googleSignIn}
                        type="button"
                        className="mx-2 h-9 w-9 rounded bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-google mx-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                    </button>
                </div>

                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
                </div>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    {/* ... Remember Me checkbox ... */}
                    <a
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                        href="/"
                    >
                        Forgot Password?
                    </a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don't have an account?{' '}
                    <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/signup"
                    >
                        Register
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Auth
