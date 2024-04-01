import React from 'react'
import logo from '../../assets/logo.png'
import { ToggleDark } from '../darkmode/toggle-dark'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import Mobile from './Mobile'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const handleSearch = async(e) => {
    e.preventDefault()
    if(query.length < 3) return
    navigate(`/search/${query}`)
  }
  return (
    <>
    <header className='sticky top-0 bg-transparent backdrop-blur-lg backdrop-filter p-4 flex items-center justify-between border-b z-50'>
        <a href="/"><img className='w-12 h-12' src={logo} alt="logo" /></a>
        <form onSubmit={handleSearch} className='relative'>
          <input className='w-[120px] rounded-full py-2 bg-foreground/50 dark:bg-muted px-4 placeholder:text-gray-900 dark:placeholder:text-gray-300' type="text" placeholder='search...' name="search" id="search" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button type='submit' variant='ghost' className='absolute right-0 top-0 hover:bg-transparent'><Search className='w-6 h-6' /></Button>
        </form>
        <ToggleDark />
    </header>
    <Mobile />
    </>
  )
}

export default Navbar