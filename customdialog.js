import "/node_modules/dompurify/dist/purify.js";


export const showalertdialog = () => {
  // This is to clear the output area
  const output = document.getElementById("out");
  output.innerHTML = "";
  const alertdialog = document.getElementById("alert");
  alertdialog.showModal();
  alertdialog.querySelector("#alertOK").addEventListener("click", () => {
    alertdialog.close();
  });
};

export const showconfirmdialog = () => {
  const output = document.getElementById("out");
  output.innerHTML = "";
  const confirmdialog = document.getElementById("confirm");
  confirmdialog.showModal();
  confirmdialog.querySelectorAll("button").forEach((elem) =>
    elem.addEventListener("click", () => {
      confirmdialog.close();
      output.textContent = `Confirm result: ${elem.textContent}`;
    })
  );
};


export const showpromptdialog = () => {
  const output = document.getElementById("out");
  output.innerHTML = "";
  const promptdialog = document.getElementById("prompt");
  promptdialog.showModal();
  promptdialog.querySelectorAll("button").forEach((elem) =>
    elem.addEventListener("click", () => {
      promptdialog.close();
      if (elem.textContent === "Cancel") {
        output.textContent = `Prompt cancelled`;
      } else {
        let clean = DOMPurify.sanitize(
          promptdialog.querySelector("#name").value
        );
        output.textContent = `Prompt result: ${clean}`;
      }
    })
  );
};
