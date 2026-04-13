import java.util.*;

class URLData {
    String longUrl;
    int count;
    String category;

    URLData(String longUrl, String category) {
        this.longUrl = longUrl;
        this.count = 0;
        this.category = category;
    }
}

public class URLShortener {

    // Hash Table
    static HashMap<String, URLData> map = new HashMap<>();

    // Heap (Max Heap)
    static PriorityQueue<Map.Entry<String, URLData>> heap =
            new PriorityQueue<>((a, b) -> b.getValue().count - a.getValue().count);

    // Tree (Category wise)
    static TreeMap<String, List<String>> categoryTree = new TreeMap<>();

    // Linked List (History)
    static LinkedList<String> history = new LinkedList<>();

    static Random rand = new Random();

    // Generate Unique Short URL
    public static String generateShortURL() {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String shortUrl;

        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                sb.append(chars.charAt(rand.nextInt(chars.length())));
            }
            shortUrl = sb.toString();
        } while (map.containsKey(shortUrl)); // avoid duplicates

        return shortUrl;
    }

    // Generate Short URL
    public static String shorten(String longUrl, String category) {
        String shortUrl = generateShortURL();

        map.put(shortUrl, new URLData(longUrl, category));

        categoryTree.putIfAbsent(category, new ArrayList<>());
        categoryTree.get(category).add(shortUrl);

        return shortUrl;
    }

    // Redirect
    public static String redirect(String shortUrl) {
        if (!map.containsKey(shortUrl)) return " URL not found";

        URLData data = map.get(shortUrl);
        data.count++;

        history.addFirst(shortUrl); // latest first

        return " " + data.longUrl;
    }

    // Analytics
    public static void showAnalytics() {
        heap.clear();
        heap.addAll(map.entrySet());

        System.out.println("\n===== ANALYTICS =====");

        // Top 3 URLs
        System.out.println("\n Top Accessed URLs:");
        int i = 0;
        PriorityQueue<Map.Entry<String, URLData>> temp = new PriorityQueue<>(heap);

        while (!temp.isEmpty() && i < 3) {
            Map.Entry<String, URLData> entry = temp.poll();
            System.out.println("short.ly/" + entry.getKey() +
                    " → " + entry.getValue().count + " clicks");
            i++;
        }

        // Categories
        System.out.println("\n Categories:");
        for (String cat : categoryTree.keySet()) {
            System.out.println(cat + " → " + categoryTree.get(cat));
        }

        // History
        System.out.println("\n Recent History:");
        for (String h : history) {
            System.out.println("short.ly/" + h);
        }
    }

    // Menu Driven
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n=====  URL SHORTENER =====");
            System.out.println("1. Shorten URL");
            System.out.println("2. Redirect");
            System.out.println("3. Analytics");
            System.out.println("4. Show History");
            System.out.println("5. Show Categories");
            System.out.println("6. Exit");

            System.out.print("Choose: ");
            int ch = sc.nextInt();
            sc.nextLine();

            switch (ch) {
                case 1:
                    System.out.print("Enter Long URL: ");
                    String longUrl = sc.nextLine();

                    System.out.print("Enter Category: ");
                    String cat = sc.nextLine();

                    String shortUrl = shorten(longUrl, cat);
                    System.out.println(" Short URL: " + shortUrl);
                    break;

                case 2:
                    System.out.print("Enter Short URL code: ");
                    String code = sc.nextLine();

                    System.out.println("Redirecting to: " + redirect(code));
                    break;

                case 3:
                    showAnalytics();
                    break;

                case 4:
                    System.out.println("\n History:");
                    for (String h : history) {
                        System.out.println("short.ly/" + h);
                    }
                    break;

                case 5:
                    System.out.println("\n Categories:");
                    for (String c : categoryTree.keySet()) {
                        System.out.println(c + " → " + categoryTree.get(c));
                    }
                    break;

                case 6:
                    System.exit(0);
            }
        }
    }
}