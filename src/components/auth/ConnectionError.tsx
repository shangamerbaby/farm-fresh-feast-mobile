
import React from 'react';

const ConnectionError: React.FC = () => {
  return (
    <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md border border-red-200">
      <p className="font-medium">Connection Error</p>
      <p className="text-sm">
        Unable to connect to Supabase. Please check your Supabase configuration or internet connection.
      </p>
    </div>
  );
};

export default ConnectionError;
