const materials = {
  hay: "🌾",
  twigs: "🥢",
  bricks: "🧱",
};

export const getMaterial = (index: number): Promise<string> => {
  return new Promise((resolve) => {
    const material = Object.values(materials)[index];

    setTimeout(() => resolve(material), 3000);
  });
};
