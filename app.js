import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, remove, update, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
  authDomain: "login-egi-agan.firebaseapp.com",
  databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
  projectId: "login-egi-agan",
  storageBucket: "login-egi-agan.firebasestorage.app",
  messagingSenderId: "395059466114",
  appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const redirectWithDelay = (url, delay = 1500) => {
  setTimeout(() => window.location.href = url, delay);
};

function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 3000);
}

function showLoading() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loadingOverlay);
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}

async function updateUserData(user, additionalData = {}) {
  const userData = {
    name: user.displayName || additionalData.name || 'User',
    email: user.email,
    ...additionalData
  };
  await set(ref(database, 'users/' + user.uid), userData);
  return userData;
}

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const googleSignInBtn = document.getElementById('google-signin');
  const githubSignInBtn = document.getElementById('github-signin');
  const twitterSignInBtn = document.getElementById('twitter-signin');
  const todoForm = document.getElementById('todo-form');
  const signoutBtn = document.getElementById('signout-btn');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        await updateUserData(user, { name });
        
        console.log("User signed up:", user);
        showPopup("Signup successful! Redirecting to project selection app.");
        redirectWithDelay("project-selection.html");

      } catch (error) {
        console.error("Signup error:", error);
        showPopup("Signup error: " + error.message, "error");
      } finally {
        hideLoading();
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Fetch user data from the database
        const userSnapshot = await get(ref(database, 'users/' + user.uid));
        const userData = userSnapshot.val();
        
        if (!userData) {
          // If user data doesn't exist in the database, create it
          await updateUserData(user);
        }
        
        console.log("User logged in:", user);
        showPopup("Login successful! Redirecting to project selection.");
        redirectWithDelay("project-selection.html");

      } catch (error) {
        console.error("Login error:", error.message);
        showPopup("Login error: " + error.message, "error");
      } finally {
        hideLoading();
      }
    });
  }

  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      showLoading();
      const provider = new GoogleAuthProvider();
      try {
        console.log("Attempting Google Sign-In...");
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        await updateUserData(user);

        console.log("User signed in with Google:", user);
        showPopup("Google Sign-In successful! Redirecting to project selection.");
        redirectWithDelay("project-selection.html");
      } catch (error) {
        console.error("Google Sign-In error:", error);
        if (error.code === 'auth/popup-blocked') {
          showPopup("Google Sign-In popup was blocked. Please allow popups for this site.", "error");
        } else if (error.code === 'auth/popup-closed-by-user') {
          showPopup("Google Sign-In was cancelled. Please try again.", "error");
        } else {
          showPopup("Google Sign-In error: " + error.message, "error");
        }
      } finally {
        hideLoading();
      }
    });
  }

  if (githubSignInBtn) {
    githubSignInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      showLoading();
      const provider = new GithubAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        await updateUserData(user);

        console.log("User signed in with GitHub:", user);
        showPopup("GitHub Sign-In successful! Redirecting to project selection.");
        redirectWithDelay("project-selection.html");
      } catch (error) {
        console.error("GitHub Sign-In error:", error);
        showPopup("GitHub Sign-In error: " + error.message, "error");
      } finally {
        hideLoading();
      }
    });
  }

  if (twitterSignInBtn) {
    twitterSignInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      showLoading();
      const provider = new TwitterAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        await updateUserData(user);

        console.log("User signed in with Twitter:", user);
        showPopup("Twitter Sign-In successful! Redirecting to project selection.");
        redirectWithDelay("project-selection.html");
      } catch (error) {
        console.error("Twitter Sign-In error:", error);
        showPopup("Twitter Sign-In error: " + error.message, "error");
      } finally {
        hideLoading();
      }
    });
  }

  if (window.location.pathname.includes('todo.html') || window.location.pathname.includes('project-selection.html')) {
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let userId = null;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            userNameElement.textContent = userData.name || user.displayName || 'User';
            if (userEmailElement) {
              userEmailElement.textContent = userData.email || user.email;
            }
          }
        });

        if (window.location.pathname.includes('todo.html')) {
          const todosRef = ref(database, `users/${userId}/todos`);
          onValue(todosRef, (snapshot) => {
            todoList.innerHTML = '';
            const todos = snapshot.val();
            if (todos) {
              Object.entries(todos).forEach(([key, value]) => {
                addTodoToDOM(key, value);
              });
            }
          });
        }
      } else {
        redirectWithDelay("login.html");
      }
    });

    if (todoForm) {
      todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (todoInput.value.trim() === '') return;

        const todosRef = ref(database, `users/${userId}/todos`);
        const newTodoRef = push(todosRef);
        await set(newTodoRef, {
          text: todoInput.value,
          completed: false,
          createdAt: new Date().toISOString()
        });

        todoInput.value = '';
        showPopup("Todo added successfully!");
      });
    }

    function addTodoToDOM(id, todoData) {
      const todoItem = document.createElement('li');
      todoItem.className = `todo-item ${todoData.completed ? 'completed' : ''}`;
      todoItem.innerHTML = `
        <span><i class="fas fa-tasks"></i> ${todoData.text}</span>
        <small><i class="far fa-clock"></i> ${new Date(todoData.createdAt).toLocaleString()}</small>
        <div>
          <button class="edit-btn"><i class="fas fa-edit"></i></button>
          <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;
      
      todoItem.querySelector('.edit-btn').addEventListener('click', async () => {
        const newText = prompt("Edit your todo", todoData.text);
        if (newText !== null && newText.trim() !== '') {
          await update(ref(database, `users/${userId}/todos/${id}`), { text: newText });
          showPopup("Todo updated successfully!");
        }
      });

      todoItem.querySelector('.delete-btn').addEventListener('click', async () => {
        if (confirm("Are you sure you want to delete this todo?")) {
          await remove(ref(database, `users/${userId}/todos/${id}`));
          showPopup("Todo deleted successfully!");
        }
      });

      todoList.appendChild(todoItem);
    }
  }

  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);
        showPopup("Signed out successfully! Redirecting to login page.");
        redirectWithDelay("login.html");
      } catch (error) {
        console.error("Sign out error:", error.message);
        showPopup("Sign out error: " + error.message, "error");
      }
    });
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("User is signed out");
  }
});
