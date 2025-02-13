import { Outlet } from "react-router";
import '../components/styles/styles.css'

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-homebg">
      <Outlet />
    </div>
  )
}
