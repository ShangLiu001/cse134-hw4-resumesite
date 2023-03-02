export const refreshPosts = () => {
  let inputposts = JSON.parse(localStorage.getItem("posts"))|| [] ;
  const tbody = document.getElementById("posts");
  tbody.innerHTML = "";

  let all = "";
  for (let post of inputposts) {
    all += `
          <tr>
            <td>${post.title}</td>
            <td>${post.date}</td>
            <td>${post.summary}</td>
            <td>
              <button type="button" class="edit"> <img src="/icons8-pencil-drawing-24.png" alt="edit button (pencil)" border="0" />  </button>
            </td>
            <td>
              <button type="button" class="delete"> <img src="/icons8-delete-24.png" alt="delete button (trashbin)" border="0" /> </button>
            </td>
          </tr>
        `;
  }
  tbody.innerHTML = all;

  // Bring delete buttons to life
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const index = Array.from(row.parentNode.children).indexOf(row);
      inputposts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(inputposts));
      refreshPosts();
    });
  });

  // Bring edit buttons to life
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const index = Array.from(row.parentNode.children).indexOf(row);

      const postformdialog = document.getElementById("postform");
      postformdialog.showModal();
      const savebutton = document.getElementById("save");
      savebutton.removeEventListener("click", savebuttonClicked);
      savebutton.addEventListener("click", savebuttonClicked);

      document.getElementById("cancel").addEventListener("click", () => {
        postformdialog.close();
      });

      function savebuttonClicked() {
        manageeditpost(inputposts);
        postformdialog.close();
        savebutton.removeEventListener("click", savebuttonClicked);
      }

      function manageeditpost(inputposts) {
        let id = index;
        let title = document.getElementById("title").value;
        let date = document.getElementById("date").value;
        let summary = document.getElementById("summary").value;
        console.log(id, title, date, summary);
        if (!title || !date || !summary) {
          alert("ALL FIELDS ARE REQUIRED");
          return;
        }
        inputposts.splice(index, 1, { id, title, date, summary });
        localStorage.setItem("posts", JSON.stringify(inputposts));
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("summary").value = "";
        refreshPosts();
      }
    });
  });
};

export const addPost = () => {
  let inputposts = JSON.parse(localStorage.getItem("posts")) || [];
  const postformdialog = document.getElementById("postform");
  postformdialog.showModal();
  const savebutton = document.getElementById("save");
  savebutton.removeEventListener("click", savebuttonClicked);
  savebutton.addEventListener("click", savebuttonClicked);

  document.getElementById("cancel").addEventListener("click", () => {
    postformdialog.close();
  });

  function savebuttonClicked() {
    managenewpost(inputposts);
    postformdialog.close();
    savebutton.removeEventListener("click", savebuttonClicked);
  }

  function managenewpost(inputposts) {
    let id = inputposts.length + 1;
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let summary = document.getElementById("summary").value;
    if (!title || !date || !summary) {
      console.log(id, title, date, summary);
      alert("ALL FIELDS ARE REQUIRED");
      return;
    }
    inputposts.push({ id, title, date, summary });
    localStorage.setItem("posts", JSON.stringify(inputposts));
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("summary").value = "";
    console.log(id, title, date, summary);
    refreshPosts();
  }
};



