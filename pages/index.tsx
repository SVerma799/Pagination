import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { paginate } from "@/utils/paginate";

export interface postType {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const [post, setPost] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const paginatedPost: postType[] = paginate(post, currentPage, pageSize);

  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPost(res);
    };
    getPost();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteButtonClick = (id: number) => {
    const filteredPost = post.filter((item) => item.id !== id);
    setPost(filteredPost);
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th> Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedPost.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    console.log("clicked");
                    deleteButtonClick(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {post.length > 0 && (
        <Pagination
          items={post}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
