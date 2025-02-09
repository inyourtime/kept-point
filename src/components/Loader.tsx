import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    </div>
  );
}

export default Loader;
