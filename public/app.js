const button = document.querySelector("#shorten");
const inputUrl = document.querySelector("#input-field-url");
const inputSlug = document.querySelector("#input-field-slug");
const longUrl = document.querySelector("#input-url");
const shortUrl = document.querySelector("#new-url");
const resultDiv = document.querySelector("#output-div")
const errorDiv = document.querySelector("#error-div");
const errorMessage = document.querySelector("#error-text");
const clearButton = document.querySelector("#clear-btn");
const copyButton = document.querySelector("#copy-btn");

/* button action */
button.addEventListener("click", (event) => {
  event.preventDefault();
  const url = inputUrl.value;
  const slug = inputSlug.value;
  const data = { url, slug };

  fetch("/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        errorDiv.style.display = "block";
        errorMessage.innerHTML = data.message;
      } else {
        shortUrl.innerHTML = `${window.location.href}${data.slug}`;
        errorDiv.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
})

const clear = () => {
  inputUrl.value = "";
  inputSlug.value = "";
  resultDiv.style.display = "none";
  errorDiv.style.display = "none";
}

clearButton.addEventListener("click", () => {
  clear();
})

copyButton.addEventListener("click", () => {
  const url = shortUrl.innerHTML;
  navigator.clipboard.writeText(url);
  copyButton.innerHTML = "Copied!";
  setTimeout(() => {
    copyButton.innerHTML = "Copy";
  }, 2000);
})

// const showResult = () => {
