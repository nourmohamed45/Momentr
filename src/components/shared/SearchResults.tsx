import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined;
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {

  if(isSearchFetching) return <Loader />

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents} />
    )
  } else {
    return (
      <div className="flex-center w-full h-full">No posts found</div>
    )
  }
}

export default SearchResults