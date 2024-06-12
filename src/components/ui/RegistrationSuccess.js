import React from 'react';

function RegistrationSuccess() {
  return (
    <div className="registration-success fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-sm">
        <h2 className="text-lg font-medium text-center mb-4">Registration Successful!</h2>
        <p className="text-gray-700">
          A verification email has been sent to your inbox. Please click the link
          in the email to verify your account.
        </p>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
