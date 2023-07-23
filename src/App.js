import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import LinkPage from "./pages/LinkPage";
import Unauthorized from "./pages/Unauthorized";
import Editor from "./pages/Editor";
import Admin from "./pages/Admin";
import Missing from "./pages/Missing";
import Lounge from "./pages/Lounge";
import RequireAuth from "./pages/RequireAuth";
import useAuth from "./hooks/useAuth";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const { auth } = useAuth();
  console.log("Auth app.js: ", auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="/editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
        >
          <Route path="/lounge" element={<Lounge />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
