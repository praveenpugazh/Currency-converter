const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");

const api = "https://api.exchangeratesapi.io/latest";
let html = "";
async function currency() {
  const res = await fetch(api);
  const data = await res.json();
  const rates = data.rates;
  const options = Object.keys(data.rates);
  console.log(options);
  options.map((option) => {
    return (html += `<option value=${option}>${option}</option>`);
  });
  for (i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }
  console.log(html);

  input[0].addEventListener("change", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });
  input[1].addEventListener("change", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });

  select[0].addEventListener("change", () => {
    input[0].value =
      (input[1].value * rates[select[0].value]) / rates[select[1].value];
  });
  select[1].addEventListener("change", () => {
    input[1].value =
      (input[0].value * rates[select[1].value]) / rates[select[0].value];
  });
}
currency();
