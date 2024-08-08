export const getPetBreed = async (pet: string, petId: number | string) => {
  const apiKey = pet === 'dog' ? process.env.NEXT_PUBLIC_DOG_API_KEY : process.env.NEXT_PUBLIC_CAT_API_KEY;

  try {
    const response = await fetch(
      `https://api.the${pet}api.com/v1/breeds/${petId}?api_key=${apiKey}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
