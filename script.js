// --- DATA STRUCTURES (Replicating your Java setup) ---
const map = new Map(); // HashMap<String, URLData>
const history = [];    // LinkedList<String> (Latest first)

// --- CORE FUNCTIONS ---

// 1. Generate Unique Short URL
function generateShortURL() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortUrl;
    do {
        shortUrl = Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (map.has(shortUrl));
    return shortUrl;
}

// 2. Shorten URL (Java: shorten())
function shorten() {
    const longUrl = document.getElementById('longUrlInput').value;
    const category = document.getElementById('categoryInput').value || "General";

    if (!longUrl) return alert("Please enter a URL");

    const shortUrl = generateShortURL();
    
    // Equivalent to new URLData(longUrl, category)
    map.set(shortUrl, {
        longUrl: longUrl,
        count: 0,
        category: category
    });

    updateUI();
    document.getElementById('longUrlInput').value = "";
    document.getElementById('categoryInput').value = "";
}

// 3. Redirect (Java: redirect())
function redirect() {
    const code = document.getElementById('shortCodeInput').value;
    if (!map.has(code)) return alert("❌ URL not found");

    const data = map.get(code);
    data.count++; // Increment clicks

    // History Logic (history.addFirst(shortUrl))
    history.unshift(code);
    if (history.length > 8) history.pop(); // Keep list clean

    updateUI();
    alert(`🔗 Redirecting to: ${data.longUrl}`);
    document.getElementById('shortCodeInput').value = "";
}

// 4. Analytics & UI Updates (Java: showAnalytics())
function updateUI() {
    // A. TOP 3 (PriorityQueue Max-Heap Logic)
    const heapDisplay = document.getElementById('heapDisplay');
    const sorted = [...map.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 3);
    
    heapDisplay.innerHTML = sorted.length ? "" : "<p class='text-xs text-slate-400'>No click data yet</p>";
    sorted.forEach(([code, data]) => {
        heapDisplay.innerHTML += `
            <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span class="text-xs font-mono font-bold">${code}</span>
                <span class="badge-count">${data.count} clicks</span>
            </div>`;
    });

    // B. CATEGORIES (TreeMap Logic - Alphabetical)
    const treeDisplay = document.getElementById('treeDisplay');
    const categories = {};
    map.forEach(v => {
        categories[v.category] = (categories[v.category] || 0) + 1;
    });

    const sortedCats = Object.keys(categories).sort(); // TreeMap behavior
    treeDisplay.innerHTML = sortedCats.length ? "" : "<p class='text-xs text-slate-400'>No categories</p>";
    sortedCats.forEach(cat => {
        treeDisplay.innerHTML += `
            <div class="flex justify-between items-center text-xs">
                <span class="font-medium text-slate-600">${cat}</span>
                <span class="badge-indigo">${categories[cat]} Links</span>
            </div>`;
    });

    // C. HISTORY (Linked List Display)
    const historyDisplay = document.getElementById('historyDisplay');
    historyDisplay.innerHTML = history.length ? "" : "<p class='text-xs text-slate-400 pt-2'>No recent activity</p>";
    history.forEach(code => {
        const data = map.get(code);
        historyDisplay.innerHTML += `
            <div class="py-3 flex justify-between items-center">
                <div>
                    <p class="text-sm font-bold font-mono">${code}</p>
                    <p class="text-[10px] text-slate-400 truncate w-48">${data.longUrl}</p>
                </div>
                <span class="text-[10px] font-bold text-slate-300 tracking-widest uppercase">${data.category}</span>
            </div>`;
    });
}

// Initial Call
updateUI();