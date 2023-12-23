import { useState } from 'react';

export default function PasswordCheck({ setIsPasswordCorrect }) {
    const [password, setPassword] = useState('');
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if (event.target.value === '111') {
        setIsPasswordCorrect(true);
      } else {
        setIsPasswordCorrect(false);
      }
    };
  

    return (
        <div>
        <h1 className="mt-5 mb-3 text-3xl font-semibold">WELCOME TO BIO BANK</h1>
        <h1 className="mt-2 mb-3 text-xl font-semibold">Password: 111</h1>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder=" Enter password"
          />
        </div>
    );
  }
  