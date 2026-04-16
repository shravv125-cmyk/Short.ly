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
SHORTURL/
├── index.html            # Web Dashboard (Structure)
├── script.js             # Frontend Logic & Data Structure Mockup
├── style.css             # Soft Tech UI Styling (Tailwind/Custom)
├── URLShortener.java     # Core Java Source Code (Logic & CLI)
├── URLShortener.class    # Compiled Java Bytecode (Main)
├── URLData.class         # Compiled Java Bytecode (Data Model)
└── README.md             # Project Documentation
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

## Output
<img width="1919" height="1020" alt="Screenshot 2026-04-13 130509" src="https://github.com/user-attachments/assets/b20165dc-7157-4671-8416-6f48acf391ae" />


## 📈 Future Roadmap

* [ ] Add **User Authentication** for private link management.
* [ ] Implement **QR Code** generation for every short link.
* [ ] Connect to a **Database** (MongoDB/PostgreSQL) for persistent storage.
* [ ] Add **Expiration Dates** to links for security.
* [ ] Unique Constraint Check
* [ ] Reserved Keyword Set
* [ ] Collision Logic

---

## 📝 Conclusion
This project proves that the foundation of great software isn't just code, but the **selection of the right data structures**. By balancing speed (HashMap) with organization (TreeMap) and ranking (Heap), Short.ly provides a robust model for modern link management.
