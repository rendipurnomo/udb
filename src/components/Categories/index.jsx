import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Cable } from 'lucide-react';
import { Gem } from 'lucide-react';
import { Dumbbell } from 'lucide-react';
import { Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import { PocketKnife } from 'lucide-react';
import { Sofa } from 'lucide-react';
import { Sprout } from 'lucide-react';
import { Ambulance } from 'lucide-react';
import { MonitorCheck } from 'lucide-react';
import { UtensilsCrossed } from 'lucide-react';

const Categories = () => {
  // const [category, setCategory] = useState([]);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full mt-20 md:hidden">
      <CarouselContent>
        <Button className="rounded-full min-w-[100px]">
          <Link to={`/category/all`} className="text-xs flex items-center">
            All <ArrowRightCircle className="ml-1" />
          </Link>
        </Button>
        {category
          ? category.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 sm:basis-1/4">
                <div className="p-1" key={index}>
                  <Button
                    className="rounded-full min-w-[110px]"
                    variant="outline">
                    <Link to={item.link} className="text-xs flex items-center justify-center gap-2">
                      {item.name} {item.icon}
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
    </Carousel>
  );
};

export default Categories;

const category = [
  {
    id: 1,
    name: 'Food',
    icon: <UtensilsCrossed />,
    link: '/category/Food',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: <Shirt />,
    link: '/category/Fashion',
  },
  {
    id: 3,
    name: 'Accesories',
    icon: <Gem />,
    link: '/category/Accesories',
  },
  {
    id: 4,
    name: 'Craft',
    icon: <PocketKnife />,
    link: '/category/Craft',
  },
  {
    id: 5,
    name: 'Electronic',
    icon: <Cable />,
    link: '/category/Electronic',
  },
  {
    id: 6,
    name: 'Otomotif',
    icon: <Dumbbell />,
    link: '/category/Otomotif',
  },
  {
    id: 7,
    name: 'Furniture',
    icon: <Sofa />,
    link: '/category/Furniture',
  },
  {
    id: 8,
    name: 'Health',
    icon: <Ambulance />,
    link: '/category/Health',
  },
  {
    id: 9,
    name: 'Herbal',
    icon: <Sprout />,
    link: '/category/Herbal',
  },
  {
    id: 10,
    name: 'Digital',
    icon: <MonitorCheck />,
    link: '/category/Digital',
  },
];
