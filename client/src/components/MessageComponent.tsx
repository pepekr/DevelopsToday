import React from 'react'
import { Link } from 'react-router-dom';

function MessageComponent({ message, setMessage }: { message: string | null, setMessage: React.Dispatch<React.SetStateAction<string | null>> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <button className="absolute top-4 right-4 text-2xl" onClick={() => setMessage(null)}>𐌗</button>
      <div className="text-center">
        {message && <p className="mb-4 text-lg font-medium">{message}</p>}
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to home page
        </Link>
      </div>
    </div>
  );
}


export default MessageComponent
