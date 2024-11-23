import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative min-w-0 max-w-screen flex-grow px-4 md:px-[40px] lg:mx-10 lg:max-w-[1100px] lg:px-0">
        {children}
      </div>
    </div>
  );
};
export default Container;
