import { useEffect, useState } from "react";
import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/QueriesAndMutations";
import { databases } from "@/lib/appwrite/config";
import { appwriteConfig } from "@/lib/appwrite/config";

const Saved = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const [savedPosts, setSavedPosts] = useState<Models.Document[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setIsPostsLoading(true);
      try {
        if (!currentUser || !currentUser.save || currentUser.save.length === 0) {
          setSavedPosts([]);
          setIsPostsLoading(false);
          return;
        }

        // Get IDs of saved posts
        const postIds = currentUser.save.map((saveRecord: Models.Document) => 
          saveRecord.post.$id
        );

        if (postIds.length === 0) {
          setSavedPosts([]);
          setIsPostsLoading(false);
          return;
        }

        // Fetch complete post data for all saved posts
        // Since we can't do an "IN" query easily, we'll fetch posts one by one
        const postsPromises = postIds.map((postId: string) => 
          databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
          )
        );

        const postsResults = await Promise.all(postsPromises);
        const validPosts = postsResults.filter(post => post); // Filter out any null results
        
        setSavedPosts(validPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setSavedPosts([]);
      } finally {
        setIsPostsLoading(false);
      }
    };

    if (currentUser) {
      fetchSavedPosts();
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="saved-container">
      <div className="flex max-w-5xl w-full">
        <div className="flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt="save"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
      </div>

      {isPostsLoading ? (
        <div className="flex-center w-full h-60">
          <Loader />
        </div>
      ) : (
        <div className="w-full max-w-5xl mt-10">
          {savedPosts.length === 0 ? (
            <div className="flex-center w-full h-60">
              <p className="text-light-4">No saved posts yet</p>
            </div>
          ) : (
            <GridPostList posts={savedPosts} showUser={true} />
          )}
        </div>
      )}
    </div>
  );
};

export default Saved;