import { useGetUsers } from "@/lib/react-query/QueriesAndMutations";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";

const AllUsers = () => {
  const { data: users, isLoading } = useGetUsers();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="users"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        {isLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.documents.map((user: Models.Document) => (
              <li key={user.$id} className="user-card">
                <Link to={`/profile/${user.$id}`} className="user-card_link">
                  <img
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="profile"
                    className="user-card_img"
                  />
                  <div className="flex-center flex-col gap-1">
                    <p className="base-medium text-light-1 text-center line-clamp-1">
                      {user.name}
                    </p>
                    <p className="small-regular text-light-3 text-center line-clamp-1">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;