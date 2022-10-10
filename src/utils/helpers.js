export const generateRandomDate = (min = 2000, max = 2023) => {
  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return new Date(
    rand,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28)
  );
};

export const generateRandomText = (subString) => {
  // generates random text that includes "subString" in random position of the string
  const randomText =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const randomPosition = Math.floor(Math.random() * randomText.length);

  const randomName =
    randomText.substring(0, randomPosition) +
    subString +
    randomText.substring(randomPosition);

  return randomName;
};


export const getYear = record => new Date(record.date).getFullYear();