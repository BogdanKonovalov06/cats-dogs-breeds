import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  breed: {
    id: string | number;
    name: string;
    image: { url: string; width: number; height: number };
  };
}

const Card: React.FC<CardProps> = ({ breed }) => {
  const router = useRouter();

  const navigateTo = () => {
    router.push(`/${breed.id}`);
  };
  return (
    <div
      onClick={navigateTo}
      className="cursor-pointer max-w-[250px] border-[1px] border-[#000000] p-4 rounded-md"
    >
      <Image
        src={breed?.image.url}
        alt={breed?.name}
        width={breed?.image.width}
        height={breed?.image.height}
      />

      {breed.name}
    </div>
  );
};

export default Card;
