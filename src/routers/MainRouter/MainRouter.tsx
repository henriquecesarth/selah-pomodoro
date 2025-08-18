import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import NotFound from "../../pages/NotFound/NotFound";
import History from "../../pages/History/History";
import { useEffect } from "react";
import { showMessage } from "../../adapters/showMessage";
import Settings from "../../pages/Settings/Settings";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        showMessage.dismiss();
    }, [pathname]);

    return null;
}

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/history' element={<History />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default MainRouter;
