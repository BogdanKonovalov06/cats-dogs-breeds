export const getPetsBreeds = async (pet: string) => {
  const apiKey =
    pet === 'dog'
      ? process.env.NEXT_PUBLIC_DOG_API_KEY
      : process.env.NEXT_PUBLIC_CAT_API_KEY;

  try {
    const response = await fetch(
      `https://api.the${pet}api.com/v1/breeds?limit=10&page=0&api_key=${apiKey}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
