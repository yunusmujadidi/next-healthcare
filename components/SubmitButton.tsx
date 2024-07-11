import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  isLoading = false,
  className,
  children,
}: {
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center w-full">
          <Loader2 className="animate-spin inline mr-2" size={20} />
          Loading
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
