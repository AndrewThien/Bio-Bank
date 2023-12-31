import { Loader2 } from 'lucide-react';

function LoadingPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="mt-5 flex items-center text-2xl">
        <h1>Loading</h1>  
        <Loader2 className="h-10 w-10 animate-spin ml-2" /> 
      </div>
    </div>
  );
}

export default LoadingPage;
