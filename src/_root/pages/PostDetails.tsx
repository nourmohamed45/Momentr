import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/QueriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isPending } = useGetPostById(id ?? "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}{" "}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {user.id === post?.creator.$id && (
                <div className="flex-center">
                  <Link to={`/update-post/${post?.$id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit-icon"
                      width={24}
                      height={24}
                    />
                  </Link>

                  <Button
                    type="button"
                    onClick={handleDeletePost}
                    variant={"ghost"}
                    className="ghost_details-delete_btn"
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete-post"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className="border w-full border-dark-4/80" />
            <div className="small-medium lg:base-medium w-full h-full flex flex-col justify-between">
              <p>{post?.caption}</p>
              <ul className="flex  mt-2 gap-2 flex-wrap">
                {post?.tags.map((tag: string) => {
                  return (
                    <li key={tag} className="text-light-3">
                      {tag.length > 0 && `#${tag}`}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
