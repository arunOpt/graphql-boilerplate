async function fertchGreeting() {
  const url = "http://localhost:9000/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query  {
        greeting
      }
            `,
    }),
  });
  const { data } = await response.json();
  return data;
}
const element = document.getElementById("graphResponse");
element.textContent = "Loading.....";
fertchGreeting().then(({ greeting }) => {
  console.log(1, greeting);
  element.textContent = greeting;
});
