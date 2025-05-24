export const gridCells = (n) => {
  return n * 16;
};

export const isSpaceFree = (walls, x, y) => {
  const str = `${x},${y}`;
  return !walls.has(str);
};
