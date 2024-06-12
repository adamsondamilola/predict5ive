import './globals.css'
import BlogHeader from './blog-header';
import BlogNav from './blog-nav';
import BlogFooter from './blog-footer';
import BlogSideBar from './blog-side-bar';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router';


const BlogLayout = () => {
  return (
<html lang="en">
      
      <body className="w-full bg-purple-900 dark:bg-gray-800 dark:text-white font-family-karla">
      <header className="w-full container mx-auto">
        {<BlogNav/>}        
      </header>                          
    <div className="bg-purple-900 dark:bg-gray-800 dark:text-white container mx-auto flex flex-wrap py-6">
    
    <Outlet/>

        <BlogSideBar/>
        </div>
        <BlogFooter/>
        <ToastContainer />
        </body>
  </html>
  
  )
}
export default BlogLayout