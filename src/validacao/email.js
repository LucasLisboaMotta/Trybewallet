const validEmail = (email) => {
  const atSing = email.split('@');
  if (!Array.isArray(atSing) || atSing.length !== 2) return false;

  const splitPoint = atSing[1].split('.');
  if (!Array.isArray(splitPoint) || splitPoint.length !== 2) return false;

  const MINIMUN_SIZE = 3;
  return ((atSing[0].length >= MINIMUN_SIZE)
  && (splitPoint[0].length >= MINIMUN_SIZE)
  && (splitPoint[1].length >= MINIMUN_SIZE));
};

export default validEmail;
