const Shuffle = (array) => {
  const copyArray = Object.assign([], array);

  let m = copyArray.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = copyArray[m];
    copyArray[m] = copyArray[i];
    copyArray[i] = t;
  }

  return copyArray;
};

export default Shuffle;
