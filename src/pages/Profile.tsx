import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";

function ProfilePage() {
  const { data: profile, isPending } = useProfile();

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 pt-[110px]">
      <div className="mx-auto max-w-2xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center md:text-left">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Info */}
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base">{profile!.name}</p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{profile!.email}</p>
              </div>

              {/* Points */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Points</p>
                <p className="text-base">{profile!.point.toLocaleString()}</p>
              </div>

              {/* Bio */}
              {profile!.profile?.bio && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Bio</p>
                  <p className="text-base">{profile!.profile?.bio}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
