import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blog"); // give all blog

      const data = await res.data;
      // console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // try{
    //   const data = await sendRequest();
    //   setBlogs(data.blog);

    // }catch(err){
    //   console.log(err);
    // }

    sendRequest().then((data) => setBlogs(data.blog));
  }, []);
  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            isUser={localStorage.getItem("userId") === blog.user._id}
            key={index}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.email}
            date={blog.date}
          />
        ))}
    </div>
  );
}

export default Blogs;
