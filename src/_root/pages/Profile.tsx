import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/QueriesAndMutations";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: currentUser } = useUserContext();
  
  const { data: user, isLoading: isLoadingUser } = useGetUserById(id || "");
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPosts(id || "");
  
  const [activeTab, setActiveTab] = useState("posts");

  // Check if the current user is the owner of this profile
  const isCurrentUser = currentUser.id === id;

  const handleEditProfile = () => {
    if(isCurrentUser) {
      navigate(`/update-profile/${id}`);
    } else {
      toast({
        title: "Unauthorized",
        description: "You can only edit your own profile",
        variant: "destructive",
      });
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner">
        <div className="flex flex-col w-full">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex flex-center">
              <img 
                src={user?.imageUrl || "/assets/icons/profile-default-placeholder.svg"} 
                alt="profile" 
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover"
              />
            </div>
            
            <div className="flex flex-col flex-1 justify-between md:mt-2">
              <div className="flex flex-col w-full">
                <h1 className="text-center lg:text-left h3-bold md:h1-semibold w-full">
                  {user?.name}
                </h1>
                <p className="text-center lg:text-left text-light-3 small-regular md:body-medium mt-2">
                  @{user?.username}
                </p>
                
                <div className="flex flex-wrap gap-8 mt-10 items-center justify-center lg:justify-start">
                  <div className="flex-center gap-2">
                    <p className="small-semibold lg:body-bold text-primary-500">
                      {posts?.documents?.length || 0}
                    </p>
                    <p className="small-medium lg:base-medium text-light-2">
                      Posts
                    </p>
                  </div>
                  
                  <div className="flex-center gap-2">
                    <p className="small-semibold lg:body-bold text-primary-500">
                      {user?.liked?.length || 0}
                    </p>
                    <p className="small-medium lg:base-medium text-light-2">
                      Liked
                    </p>
                  </div>
                </div>
                
                {user?.bio && (
                  <div className="mt-7 max-w-screen-sm">
                    <p className="text-center lg:text-left small-regular md:base-medium text-light-2">
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center lg:justify-start mt-7">
                {isCurrentUser ? (
                  <Button 
                    onClick={handleEditProfile}
                    className="shad-button_primary"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button 
                    className="shad-button_primary"
                    onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "This feature is not yet implemented",
                      });
                    }}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1 flex flex-col mt-10 w-full">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="profile-tabs">
                <TabsTrigger 
                  value="posts"
                  className="profile-tab"
                  onClick={() => setActiveTab("posts")}
                >
                  <img 
                    src="/assets/icons/posts.svg" 
                    alt="posts" 
                    width={20}
                    height={20}
                    className={`${activeTab === "posts" ? "invert-white" : ""}`}
                  />
                  Posts
                </TabsTrigger>
                
                <TabsTrigger 
                  value="saved"
                  className="profile-tab"
                  onClick={() => {
                    setActiveTab("saved");
                    navigate(`/saved`);
                  }}
                >
                  <img 
                    src="/assets/icons/save.svg" 
                    alt="saved" 
                    width={20}
                    height={20}
                    className={`${activeTab === "saved" ? "invert-white" : ""}`}
                  />
                  Saved
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="w-full">
                {isLoadingPosts ? (
                  <div className="flex-center w-full h-40">
                    <Loader />
                  </div>
                ) : (
                  <div className="w-full">
                    {posts?.documents && posts.documents.length > 0 ? (
                      <GridPostList posts={posts.documents} showUser={false} />
                    ) : (
                      <div className="flex-center w-full h-40">
                        <p className="text-light-3">No posts yet</p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 