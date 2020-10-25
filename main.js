const input = document.querySelector("#app input"),
  addBtn = document.querySelector("#app button"),
  ul = document.querySelector("ul"),
  result = document.querySelector("#result");

const store = [];

const renderList = (data) => {
  ul.innerHTML = "";

  store.push(data);

  store.forEach((item, i) => {
    const li = document.createElement("li"),
      anch = document.createElement("a");

    anch.setAttribute("href", "#");
    anch.append(`repo${i + 1}`);

    li.appendChild(anch);
    ul.appendChild(li);

    anch.addEventListener("click", function () {
      result.innerHTML = "";
      result.innerHTML = JSON.stringify(store[i]);
    });
  });
};

const msg = (msg) => {
  const p = document.createElement("p");
  let oldP;

  p.append(msg);
  p.style.cssText = `
    margin: 0;
    padding: 0;
  `;

  ul.appendChild(p);

  oldP = ul.querySelectorAll("p");

  if (oldP.length > 1) {
    ul.removeChild(oldP[0]);
  }
};

const addItem = (vector) => {
  const notEncountered = vector.every((item) => item.name !== input.value);

  if (notEncountered) {
    msg("Nome não encontrado");
  } else {
    for (item of vector) {
      if (item.name === input.value) {
        renderList(item);
        input.value = "";
      }
    }
  }
};

const getURLData = (url) => {
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    msg("carregando");

    getURLData("https://api.github.com/users/diego3g/repos")
      .then((data) => {
        addItem(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
