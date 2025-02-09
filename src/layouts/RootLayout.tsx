import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { useProfile } from "@/hooks/useProfile";
import { Outlet } from "react-router";

function RootLayout() {
  const { isPending } = useProfile();

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
