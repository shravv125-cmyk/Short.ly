// --- DATA STRUCTURES (Simulating Java Collections) ---
const map = new Map();             // HashMap<String, URLData> - Stores ShortCode -> Data
const reverseMap = new Map();      // HashMap<String, String>  - Stores LongUrl -> ShortCode (Prevents duplicates)
const history = [];                // LinkedList<String>       - Deque for recent click history
const undoStack = [];              // Stack<String>            - LIFO for undoing recent shortenings
const blockedDomains = new Set([   // HashSet<String>          - O(1) lookup for security filtering
    'malware.com', 
    'phishing.org', 
    'spam.net'
]); 

// --- CORE FUNCTIONS ---

// 1. Generate Unique Short URL
function generateShortURL() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortUrl;
    do {
        shortUrl = Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (map.has(shortUrl)); // Collision resolution check
    return shortUrl;
}

// 2. Shorten URL (Java: shorten())
function shorten() {
    const longUrl = document.getElementById('longUrlInput').value.trim();
    const category = document.getElementById('categoryInput').value.trim() || "General";

    if (!longUrl) return alert("Please enter a URL");

    // DATA STRUCTURE IMPLEMENTATION: HashSet (Security Filter)
    // Extract domain from URL to check against our O(1) blocked set
    const domainMatch = longUrl.match(/:\/\/(www\.)?(.[^/:]+)/i);
    const domain = domainMatch ? domainMatch[2] : longUrl;
    if (blockedDomains.has(domain)) return alert("Security Alert: Domain is blocked!");

    // DATA STRUCTURE IMPLEMENTATION: Reverse HashMap (Efficiency/Deduplication)
    if (reverseMap.has(longUrl)) {
        const existingCode = reverseMap.get(longUrl);
        alert(`URL already shortened! Your code is: ${existingCode}`);
        return;
    }

    const shortUrl = generateShortURL();
    
    // Store in both maps
    map.set(shortUrl, {
        longUrl: longUrl,
        count: 0,
        category: category
    });
    reverseMap.set(longUrl, shortUrl);

    // DATA STRUCTURE IMPLEMENTATION: Stack (LIFO push)
    undoStack.push(shortUrl);

    updateUI();
    document.getElementById('longUrlInput').value = "";
    document.getElementById('categoryInput').value = "";
}

// 3. Undo Last Shorten (Java: Stack.pop())
function undoShorten() {
    if (undoStack.length === 0) return alert("Nothing to undo!");

    // DATA STRUCTURE IMPLEMENTATION: Stack (LIFO pop)
    const lastCode = undoStack.pop(); 
    const data = map.get(lastCode);

    // Remove from Maps to free memory
    map.delete(lastCode);
    reverseMap.delete(data.longUrl);

    updateUI();
    alert(`Undid shortening for: ${lastCode}`);
}

// 4. Redirect (Java: redirect())
function redirect() {
    const code = document.getElementById('shortCodeInput').value.trim();
    if (!map.has(code)) return alert("URL not found");

    const data = map.get(code);
    data.count++; // Increment clicks

    // DATA STRUCTURE IMPLEMENTATION: LinkedList (addFirst logic)
    history.unshift(code);
    if (history.length > 8) history.pop(); // Keep list clean

    updateUI();
    alert(`Redirecting to: ${data.longUrl}`);
    document.getElementById('shortCodeInput').value = "";
}

// 5. Analytics & UI Updates (Java: showAnalytics())
function updateUI() {
    // A. TOP 3 (PriorityQueue / Max-Heap Logic)
    const heapDisplay = document.getElementById('heapDisplay');
    if (heapDisplay) {
        const sorted = [...map.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 3);
        
        heapDisplay.innerHTML = sorted.length ? "" : "<p class='text-xs text-slate-400'>No click data yet</p>";
        sorted.forEach(([code, data]) => {
            heapDisplay.innerHTML += `
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-xs font-mono font-bold">${code}</span>
                    <span class="badge-count">${data.count} clicks</span>
                </div>`;
        });
    }

    // B. CATEGORIES (TreeMap Logic - Alphabetical Sort)
    const treeDisplay = document.getElementById('treeDisplay');
    if (treeDisplay) {
        const categories = {};
        map.forEach(v => {
            categories[v.category] = (categories[v.category] || 0) + 1;
        });

        const sortedCats = Object.keys(categories).sort(); 
        treeDisplay.innerHTML = sortedCats.length ? "" : "<p class='text-xs text-slate-400'>No categories</p>";
        sortedCats.forEach(cat => {
            treeDisplay.innerHTML += `
                <div class="flex justify-between items-center text-xs">
                    <span class="font-medium text-slate-600">${cat}</span>
                    <span class="badge-indigo">${categories[cat]} Links</span>
                </div>`;
        });
    }

    // C. HISTORY (LinkedList Display)
    const historyDisplay = document.getElementById('historyDisplay');
    if (historyDisplay) {
        historyDisplay.innerHTML = history.length ? "" : "<p class='text-xs text-slate-400 pt-2'>No recent activity</p>";
        history.forEach(code => {
            const data = map.get(code);
            // Safety check in case it was undone but still in history
            if(data) { 
                historyDisplay.innerHTML += `
                    <div class="py-3 flex justify-between items-center">
                        <div>
                            <p class="text-sm font-bold font-mono">${code}</p>
                            <p class="text-[10px] text-slate-400 truncate w-48">${data.longUrl}</p>
                        </div>
                        <span class="text-[10px] font-bold text-slate-300 tracking-widest uppercase">${data.category}</span>
                    </div>`;
            }
        });
    }
}

// Initial Call
updateUI();
