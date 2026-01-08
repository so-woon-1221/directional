import { Loader } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default LoadingState;
