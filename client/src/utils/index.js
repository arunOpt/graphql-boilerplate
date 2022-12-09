function delay(ms) {
  new Promise((resolve) => setTimeout(resolve, ms));
}
export { delay };
// const testFunction = async () => {
//   await delay(2000);
// };
