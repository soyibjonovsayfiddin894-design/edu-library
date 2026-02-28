// Login/Register
const loginForm = document.getElementById('loginForm');
const registerLink = document.getElementById('registerLink');
const registerBox = document.getElementById('registerBox');
const registerBtn = document.getElementById('registerBtn');

if(loginForm){
    loginForm.addEventListener('submit', async e=>{
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const res = await fetch('/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        });
        const data = await res.json();
        if(data.success){
            localStorage.setItem('user',JSON.stringify(data.user));
            window.location.href='/dashboard.html';
        } else alert(data.message);
    });

    registerLink.addEventListener('click',()=>registerBox.style.display='block');

    registerBtn.addEventListener('click', async ()=>{
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const res = await fetch('/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        });
        const data = await res.json();
        alert(data.message);
        if(data.success) registerBox.style.display='none';
    });
}

// Dashboard
const booksContainer = document.getElementById('booksContainer');
const searchBox = document.getElementById('searchBox');
const logoutBtn = document.getElementById('logoutBtn');

if(booksContainer){
    async function loadBooks(){
        const res = await fetch('/books');
        const books = await res.json();
        displayBooks(books);
    }
    function displayBooks(books){
        booksContainer.innerHTML='';
        books.forEach(book=>{
            const div = document.createElement('div');
            div.className='book';
            div.innerHTML=<strong>${book.title}</strong> | 
            <a href="${book.pdf}" target="_blank">📄 PDF</a> | 
            <a href="${book.video}" target="_blank">🎬 Video</a>;
            booksContainer.appendChild(div);
        });
    }
    searchBox.addEventListener('input', async ()=>{
        const res = await fetch('/books');
        let books = await res.json();
        const query = searchBox.value.toLowerCase();
        books = books.filter(b=>b.title.toLowerCase().includes(query));
        displayBooks(books);
    });
    loadBooks();
}

// Logout
if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('user');
        window.location.href='/';
    });
}

// Toggle theme
const toggleThemeBtn = document.getElementById('toggleTheme');
if(toggleThemeBtn){
    toggleThemeBtn.addEventListener('click', ()=>{
        document.body.classList.toggle('dark');
    });
}