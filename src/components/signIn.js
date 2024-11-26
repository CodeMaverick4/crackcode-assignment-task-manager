import React, { useState } from 'react';
import { auth } from '../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';  // Import the useNavigate hook

export default function SignUp() {
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("123456");
    const [errMsg, setError] = useState("");

    const navigate = useNavigate(); // Initialize the navigate function

    // Handle login functionality
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        
        try {
            // Sign in with Firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate('/all_task'); // Navigate to the '/all_task' page on success
        } catch (err) {
            console.log("Login error:", err);
            const errorMessage = getFriendlyErrorMessage(err.code);
            setError(errorMessage);  // Display the error message
        }
    };

    // Function to return a friendly error message
    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No user found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-email':
                return 'The email address is not valid. Please enter a valid email.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your internet connection and try again.';
            default:
                return 'An unexpected error occurred. Please try again later.';
        }
    };

    return (
        <div className="round-xl bg-[#fcf5eb] flex justify-center items-center h-screen font-mono">
            <div className="flex flex-col gap-8 border-2 border-black rounded-xl bg-white items-center px-10 py-10 md:w-1/3">
                <h1 className="text-5xl text-center">Sign In</h1>
                {errMsg && <span className="text-red-400">{errMsg}</span>}
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email" className="text-xl font-semibold"> Email </label>
                    <input
                        id="email"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-4 px-2 border-2 border-black focus:border-purple-600 outline-none peer rounded-lg"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-xl font-semibold"> Password </label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"  // Change to type password for security
                        className="py-4 px-2 border-2 border-black focus:border-purple-600 outline-none peer w-full rounded-lg"
                        required
                    />
                </div>

                <div className="flex flex-col gap-3 justify-center items-center">
                    <button onClick={handleLogin} className="bg-[#25d366] px-10 py-2 rounded-lg border border-black hover:rounded-2xl">
                        Sign In
                    </button>
                   <div>                        
                   <Link to={'/signup'} className='text-center'> don't have account? <span className='font-semibold'>Sign up</span></Link>
                        
                    </div> 
                    
                </div>
            </div>
        </div>
    );
}
