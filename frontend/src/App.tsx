import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Main from "./components/Main";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import { UserProfile } from "./components/UserProfile";

import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header logged={false} /> <Main /> <Footer />
            </>
          }
        />
        <Route
          path="/id"
          element={
            <>
              <Header logged={true} /> <Footer />
            </>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
