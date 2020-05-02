export default function shallow(source, destination) {
  Object.keys(source).forEach((key) => {
    if (source.hasOwnProperty(key)) {
      console.log(key);
      destination[key] = source[key];
    } else {
      console.log(key);
    }
  });
}
