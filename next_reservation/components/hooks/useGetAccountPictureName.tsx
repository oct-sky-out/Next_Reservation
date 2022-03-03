const useGetAccountPictureName = (imageSrc: string) => {
  if (!imageSrc.includes('firebase')) return '';

  const NAME = 0;
  const imageName = imageSrc.split('%2F')[1].split('?')[NAME];

  return imageName;
};

export default useGetAccountPictureName;
