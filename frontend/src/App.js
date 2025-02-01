import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import CategoryPosts from './pages/CategoryPosts';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';

function App() {
  return (
    <div>
          <Router>
            <Header/>
              <Routes>
                  <Route path='/' element={<PostList/>} />
                  <Route path='/posts/:id' element={<PostDetail/>} />
                  <Route path='/posts/category/:id' element={<CategoryPosts/>} />
                  <Route path='/post' element={<Posts/>} />
                  <Route path='/admin' element={<AdminPanel/>} />
              </Routes>
            <Footer/>
            <Toaster/>
          </Router>
    </div>
  );
}

export default App;
