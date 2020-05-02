export default function shallow(source, destination) {
  Object.keys(source).forEach((key) => {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  });
}
