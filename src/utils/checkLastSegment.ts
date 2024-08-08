export const checkLastSegment = (path: string) => {
  const segments = path.split('/');
  const lastSegment = segments.pop() || '';
  return isNaN(Number(lastSegment)) ? 'string' : 'number';
};
