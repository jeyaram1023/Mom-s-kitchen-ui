@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

body {
    font-family: 'Nunito', sans-serif;
    margin: 0;
    background-color: #f9f9f9;
}

.soft-white-bg {
    background-color: #ffffff;
}

.container {
    padding: 20px;
    max-width: 600px;
    margin: auto;
}

/* Welcome Screen */
.welcome-container {
    text-align: center;
}

.notification {
    background-color: #f0f8ff;
    border-left: 5px solid #ff69b4;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

#user-form input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.submit-btn {
    background-color: #ff69b4;
    color: white;
    border: none;
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #ff1493;
}

/* Home Page */
.home-header {
    background-color: #ffc0cb; /* Baby Pink */
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Clarinette-style', sans-serif; /* You might need to import this font */
}

.home-header a {
    color: white;
    text-decoration: none;
    font-size: 24px;
}

.header-icons button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    margin-left: 15px;
    cursor: pointer;
}

.greeting-section #greeting {
    font-size: 28px;
    font-weight: bold;
    background: -webkit-linear-gradient(45deg, #ff69b4, #1e90ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.categories-section .scrollable-categories {
    display: flex;
    overflow-x: auto;
    padding-bottom: 15px;
}

.category-btn {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s, color 0.3s;
}

.category-btn.active, .category-btn:hover {
    background-color: #ff69b4;
    color: white;
}

.moms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    overflow-x: auto;
}

.moms-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.customer-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 15px;
    text-align: center;
    transition: transform 0.2s;
}

.customer-card:hover {
    transform: translateY(-5px);
}

.customer-card img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.customer-card h4 {
    margin: 10px 0 5px;
}

.customer-card .food-type {
    font-size: 14px;
    color: #666;
}

.card-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
}

.card-actions .like-btn, .card-actions .share-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.card-actions .add-btn {
    background-color: #ff69b4;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
}

/* Profile & Add Seller Page */
.profile-container, .add-seller-container {
    padding-top: 40px;
}

.profile-image {
    display: block;
    margin: 0 auto 20px;
    border-radius: 50%;
}

.profile-modify-btn, .help-btn {
    display: block;
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    color: white;
    margin-top: 10px;
    border: none;
    cursor: pointer;
}

.profile-modify-btn { background-color: #1e90ff; }
.help-btn { background-color: #32cd32; }

/* Bottom Navigation */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}

.nav-item {
    padding: 15px;
    text-decoration: none;
    color: #333;
    flex-grow: 1;
    text-align: center;
}

.nav-item.active {
    color: #ff69b4;
    font-weight: bold;
}
