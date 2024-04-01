import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils';

const HeaderProduct = ({title, className,path}) => {
  return (
    <div className={cn("flex justify-between items-center",className)}>
      <div className="text-xl md:text-3xl font-bold mb-4 inline-block">
        <h1>{title}</h1>
        <div className="h-[4px] bg-gradient-to-r from-destructive/20 via-primary to-destructive/20 rounded-full" />
      </div>
      <Link
        to={path}
        className="flex items-center gap-2 font-light text-sm hover:text-primary">
        <ArrowRight size={20} />
        View all
      </Link>
    </div>
  );
}

export default HeaderProduct