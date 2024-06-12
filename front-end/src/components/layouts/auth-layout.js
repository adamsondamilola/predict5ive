import './globals.css'
import BlogHeader from './blog-header';
import BlogNav from './blog-nav';
import BlogFooter from './blog-footer';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router';

const AuthLayout = () => {

  const metadata = {
    title: 'Predict 5ive',
    description: 'Using AI and emotional intelligence for predicting the results of football, basketball and other sports',
  }

  return (
    <html lang="en">
      
      <body className="w-full bg-purple-900 font-family-karla">
      {/*<BlogNavMain/>*/}
      <header className="w-full container mx-auto">
        {<BlogNav/>}        
      </header>                          
    <div className="bg-purple-900 container mx-auto flex flex-wrap py-6">
    
    <Outlet/>

        </div>
        <BlogFooter/>
        </body>

    </html>
  )
}
export default AuthLayout