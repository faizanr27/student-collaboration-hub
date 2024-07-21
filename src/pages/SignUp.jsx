import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from 'firebase/firestore';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilepic, setProfilePic] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            // Create a new user account with the provided email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Combine first and last names into displayName
            const displayName = `${firstName} ${lastName}`;

            // Update the user's display name
            await updateProfile(user, {
                displayName
            });

            // Add user information to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: `${firstName} ${lastName}`,
                email,
                profilepic
              });
              await setDoc(doc(db, "userChats", userCredential.user.uid), {});
              setProfilePic('');

            // Show success notification
            toast.success('Signup successful!', { position: 'top-right' });

            // Redirect or perform other actions after successful signup
            navigate('/home');
        } catch (error) {
            console.error('Error signing up:', error.message);

            // Show error notification if the email is already in use
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use!', { position: 'top-right' });
            } else {
                toast.error('Error signing up!', { position: 'top-right' });
            }

            // Handle other errors as needed
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="button"
                        onClick={handleSignUp}
                    >
                        Register
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{' '}
                    <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/"
                    >
                        SignIn
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default SignUp;
