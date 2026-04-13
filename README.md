# 🔗 Short.ly | Advanced URL Shortener & Analytics

A high-performance URL shortening service built with **Java** and **Tailwind CSS**. This project demonstrates the practical application of multiple data structures to solve real-world problems like data retrieval, ranking, and organization.

## 🚀 Key Features

* **Fast Redirection:** Instant mapping of short codes to long URLs.
* **Real-time Analytics:** Tracks click counts and identifies trending links.
* **Categorization:** Group links into custom categories (e.g., Work, Social, Personal).
* **Activity History:** A "Latest-First" log of recently accessed links.
* **Modern UI:** A "Soft Tech" dashboard designed for a premium user experience.

---

## 🛠️ Data Structures at Work

This project is a hybrid system that strategically uses different structures for maximum efficiency:

| Task | Data Structure | Why? | Time Complexity |
| :--- | :--- | :--- | :--- |
| **URL Lookup** | `HashMap` | $O(1)$ constant time for instant redirects. | $O(1)$ |
| **Top Ranking** | `PriorityQueue` | A Max-Heap to extract the most clicked links. | $O(\log n)$ |
| **Sorted Categories** | `TreeMap` | Red-Black Tree to keep categories in alphabetical order. | $O(\log n)$ |
| **Recent History** | `LinkedList` | To add new activity to the top of the list instantly. | $O(1)$ |




---

## 💻 Tech Stack

* **Backend:** Java (Collections Framework)
* **Frontend:** HTML5, Tailwind CSS (Soft Tech UI)
* **Logic:** JavaScript (Mapping Java logic to Web)

---

## 📂 Project Structure

```text
├── src/
│   └── URLShortener.java      # Core Java Logic & CLI
├── web/
│   ├── index.html             # Dashboard Structure
│   ├── style.css              # Soft Tech Aesthetics
│   └── script.js              # Frontend Logic (State Management)
└── README.md                  # Project Documentation
```

---

## ⚙️ Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/shortly-url-manager.git
    ```
2.  **Run the Java CLI:**
    ```bash
    javac URLShortener.java
    java URLShortener
    ```
3.  **Run the Web UI:**
    Simply open `web/index.html` in any modern browser to view the dashboard.

---

## 📈 Future Roadmap

* [ ] Add **User Authentication** for private link management.
* [ ] Implement **QR Code** generation for every short link.
* [ ] Connect to a **Database** (MongoDB/PostgreSQL) for persistent storage.
* [ ] Add **Expiration Dates** to links for security.

---

## 📝 Conclusion
This project proves that the foundation of great software isn't just code, but the **selection of the right data structures**. By balancing speed (HashMap) with organization (TreeMap) and ranking (Heap), Short.ly provides a robust model for modern link management.
