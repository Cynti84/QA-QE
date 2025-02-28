console.log("hello typescript!!!")

type rectangleType = {
  width: number;
  height: number;
};
const getRectangleArea = (rectangle: rectangleType) => {
  return rectangle.width * rectangle.height;
};
const getRectanglePerimeter = (rectangle: rectangleType) => {
  return 2 * (rectangle.width + rectangle.height);
};

const rectangle = {
  width: 10,
  height: 10,
};
console.log(getRectangleArea(rectangle));

const myFunction = (a: number, b: number) => {
  return a + b;
};
