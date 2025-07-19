import React from 'react'
import { useState , useEffect} from 'react'

const Navbar = () => {
    const[theme , setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if(savedTheme){
            setTheme(savedTheme);
        }else if(systemPreferDark){
            setTheme('dark');
        }
    },[])

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('data-theme' , theme);
        localStorage.setItem('theme' , theme);
    },[theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

  return (
    <div className="navbar  bg-white dark:bg-gradient-to-t from-base-100 to-black  text-black dark:text-white px-4 py-3 shadow-md ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>

    </div>
    <a className="btn btn-ghost text-xl">BitAdda</a>
  </div>
  <div className="navbar-end pr-4 ">
   <button onClick={toggleTheme} aria-label={`swithch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
    {
        theme==="dark" ? (
            <span className='text-yellow-300 text-xl ml-4'>🌞</span>
        ):(
            <span className='text-gray-300 text-xl ml-4'>🌜</span>
        )
    }
   </button>
  </div>
</div>
  )
}

export default Navbar
