'use client';
import { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Breed, BreedImage } from '@/interfaces/Breed';
import { getPetBreed, getPetBreedImages } from '../../api';
import Image from 'next/image';
import { checkLastSegment } from '@/utils/checkLastSegment';

export default function PetBreedPage() {
  const [petBreed, setPetBreed] = useState<Breed | null>(null);
  const [petBreedImages, setPetBreedImages] = useState<BreedImage[]>([]);

  const pathname = usePathname();

  const segmentType = checkLastSegment(pathname);
  const petType = segmentType === 'string' ? 'cat' : 'dog';
  const petId = pathname.substring(1);

  const getBreedInfo = async () => {
    const breed = await getPetBreed(petType, petId);
    setPetBreed(breed);

    const breedImages = await getPetBreedImages(petType, petId);
    setPetBreedImages(breedImages);
  };

  useEffect(() => {
    getBreedInfo();
  }, []);

  const [firstImage, ...otherImages] = petBreedImages;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-20 px-10 w-full">
      <Suspense fallback="Loading...">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-[40px] mb-5">{petBreed?.name}</h1>

          {firstImage && (
            <Image
              src={firstImage.url}
              alt={petBreed?.name || 'First image'}
              width={500}
              height={400}
              className="mb-10"
            />
          )}

          <div className="flex flex-col gap-3 w-full">
            <p>{petBreed?.description}</p>
            <p>
              <b>Life span:</b> {petBreed?.life_span}
            </p>
            <p>
              <b>Temperament:</b> {petBreed?.temperament}
            </p>
            <p>
              <b>Weight: </b>
              {petBreed?.weight.imperial} (imperial), {petBreed?.weight.metric}{' '}
              (metric)
            </p>
          </div>

          <div className="flex gap-4 items-center justify-center mt-5 flex-wrap">
            {otherImages.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={image.id}
                width={200}
                height={200}
              />
            ))}
          </div>
        </div>
      </Suspense>
    </main>
  );
}
