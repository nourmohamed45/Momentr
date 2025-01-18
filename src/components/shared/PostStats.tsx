import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/QueriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const { data: currentuser } = useGetCurrentUser();

  const savedPostRecord = currentuser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentuser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id ?? "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id ?? "", userId });
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <button onClick={handleLikePost} title="like" type="button">
          <img
            src={
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }
            alt="like"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <button onClick={handleSavePost} title="save" type="button">
            <img
              src={
                isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              }
              alt="like"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostStats;
