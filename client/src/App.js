import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Blogs from "./Components/Blogs/Blogs";
import UserBlogs from "./Components/UserBlogs/UserBlogs";
import BlogDetail from "./Components/BlogDetail/BlogDetail";
import AddBlog from "./Components/AddBlog/AddBlog";
import Err from "./Components/Err/Err";

import Header from "./Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Components/store/store.js";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, []);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route exact path="/login" element={<Login />} />
          ) : (
            <>
              <Route exact path="/blogs" element={<Blogs />} />
              <Route exact path="/userblogs" element={<UserBlogs />} />
              <Route exact path="/userblogs/:id" element={<BlogDetail />} />
              <Route exact path="/blogs/add" element={<AddBlog />} />
              <Route path="*" element={<Err />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
