import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileInfo from "@/components/profile/ProfileInfo";
import FavoritesPanel from "@/components/profile/FavoritesPanel";
import RecentOrders from "@/components/profile/RecentOrders";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <main
        className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="order-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <ProfileSidebar />
          </div>

          <div className="order-2 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2 lg:col-start-1 lg:row-start-1">
            <div id="profile-info" className="min-w-0">
              <ProfileInfo />
            </div>
            <FavoritesPanel />
          </div>

          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
            <RecentOrders />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
