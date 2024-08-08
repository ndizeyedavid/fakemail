import toast, { Toaster } from 'react-hot-toast';
import ConfettiExplosion from 'react-confetti-explosion';
import { useState } from 'react';

const Email = ({ email, min, sec }) => {
    const [isExploding, setIsExploding] = useState(false);

    function getCookieExpirationTime() {
        const cookieValue = document.cookie.split('=')[0];
        if (!cookieValue) return null;

        const cookieParts = cookieValue.split(';');
        for (const part of cookieParts) {
            const [key, value] = part.split('=');
            if (key.trim() === 'expires') {
                return new Date(value);
            }
        }
        return null;
    }

    // console.log(getCookieExpirationTime())

    // function getRemainingTime(time) {
    //     const expirationTime = getCookieExpirationTime(cookieName);
    //     if (!expirationTime) return null;

    //     const now = new Date();
    //     const remainingTime = expirationTime - now;
    //     return remainingTime;
    // }

    function copyToClipboard() {
        let tempEmailEl = document.getElementById('yourTempEmail');
        tempEmailEl.select();
        document.execCommand('copy');
        setIsExploding(true)
        toast('E-mail copied!', {
            icon: '🎉',
        });
    }
    return (
        <>
            <Toaster />
            <section className="bg-white dark:bg-gray-800 pt-20">
                <div className="container px-6 py-16 mx-auto text-center">
                    <div className="max-w-lg mx-auto">
                        <div className="border-2 border-dashed rounded-sm border-gray-600 px-5 py-7">
                            <h1 className="text-lg font-semibold text-gray-800 dark:text-white lg:text-xl">Your temporary email is here:</h1>

                            <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
                                <form className="flex flex-col md:flex-row">
                                    <input type="email" value={email} onClick={() => document.getElementById('btn').click()} id="yourTempEmail" placeholder="Your temporary email address" readOnly className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0" />
                                    {isExploding && <ConfettiExplosion particleCount={100} duration={3000} force={0.8} width={1600} onComplete={() => setIsExploding(false)} />}
                                    <button type="button" id='btn' onClick={() => copyToClipboard()} className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">Copy</button>

                                </form>
                            </div>
                            <div className='timer mt-3 mb-0 text-white'>
                                <span className="countdown font-mono text-2xl">
                                    <span style={{ "--value": min }}></span>:
                                    <span style={{ "--value": sec }}></span>
                                </span>
                            </div>
                        </div>
                        <p className="dark:text-gray-500 mt-10">Forget about spam and advertising mailings.Keep your real inbox clean and secure.</p>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Email
