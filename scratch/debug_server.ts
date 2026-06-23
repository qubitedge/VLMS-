async function test() {
  const res = await fetch('http://localhost:8080/workspace?exp=llms-w1-2');
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Length:", text.length);
  console.log("Start of response:", text.substring(0, 1000));
}
test();
