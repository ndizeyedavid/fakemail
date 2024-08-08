import NavBar from "./components/NavBar"
import Email from "./components/Email"
import Body from "./components/Body"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react"

const App = () => {
  // fetched Data
  const [tempMail, setTempMail] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  // cookie setting
  function setCookie(name, value, expiresInMinutes = 10) {
    const expires = new Date(Date.now() + expiresInMinutes * 60000);
    document.cookie = `email=${value}; expires=${expires.toUTCString()}; path=/`;
    localStorage.setItem('exp', expires.getTime());

  }

  function getCookieExpirationTime() {
    const storedExpiration = localStorage.getItem('exp');
    if (storedExpiration) {
      return new Date(parseInt(storedExpiration));
    }
    return null;
  }

  function countDown() {
    try {
      // setMin(getCookieExpirationTime().getMinutes())
      // setMin(new Date().getMinutes())
      // setMin(new Date().getMinutes() - getCookieExpirationTime().getMinutes())
      setMin(getCookieExpirationTime().getMinutes() - new Date().getMinutes())
      setSec(60 - new Date().getSeconds())
      // console.log(60 - min);
    }
    catch (err) {
      toast.error("Timer error");
      clearInterval(timerCounting);
    }
  }
  let timerCounting = setInterval(countDown, 1000)

  function getCookie() {
    let cookie = document.cookie.split('=');
    return cookie[1];
  }
  useEffect(() => {
    let random = Math.random().toString(36).substring(2, 10);
    if (getCookie() === undefined) {
      setCookie("email", random);
      toast('A new E-mail is established!', {
        icon: '📧',
      });
    }

    const fetchEmail = async () => {
      const result = await fetch('http://localhost:9090/?e=' + getCookie())
        .then(d => {
          const result = d.json()
            .then(data => {
              setTempMail(data.address);
            })
        })
        .catch((err) => {
          if (err) return toast.error("Failed to set up your Temporary E-mail.")
        })
    }

    const fetchMessages = async () => {
      setLoading(true);
      const result = await fetch('http://localhost:9090/message?e=' + getCookie())
        .then(d => {
          const result = d.json()
            .then(data => {
              // console.log(data)
              // setTempMail(data.address);
              setMessageCount(data.messageCount);
              setMessages(data.messages);
              if (data.messages.length == 0) {
                setEmpty(true);
              } else {
                setEmpty(false);
              }
              setLoading(false);
            })
        })
        .catch((err) => {
          if (err) return toast.error("Server error, Please refresh the browser!")
        })
    }

    setInterval(fetchMessages, 5000);
    fetchEmail();
  }, [])
  return (
    <>
      <Toaster />
      <NavBar />
      <Email email={tempMail} min={min} sec={sec} />
      <Body count={messageCount} msg={messages} loading={loading} empty={empty} />
    </>
  )
}

export default App
