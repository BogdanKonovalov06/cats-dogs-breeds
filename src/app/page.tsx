'use client';
import { Suspense, useEffect, useState } from 'react';
import { getPetsBreeds } from '../api';
import Card from '../components/Card';
import { Breed } from '@/interfaces/Breed';

export default function Home() {
  const [catsBreeds, setCatsBreeds] = useState<Breed[]>([]);
  const [dogsBreeds, setDogsBreeds] = useState<Breed[]>([]);

  const getBreeds = async () => {
    const cats = await getPetsBreeds('cat');
    setCatsBreeds(cats);
    const dogs = await getPetsBreeds('dog');
    setDogsBreeds(dogs);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  const breeds = [...catsBreeds, ...dogsBreeds];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-20 px-10 w-full">
      <Suspense fallback="Loading...">
        <h1 className="mb-10 text-[40px]">Cats and Dogs</h1>
        <div className="flex gap-3 flex-wrap justify-center">
          {breeds.map((breed) => (
            <Card breed={breed} key={breed.id} />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
