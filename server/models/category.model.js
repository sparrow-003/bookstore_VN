// ==================================================
// CATEGORY MODEL - Data schema for categories/genres
// ==================================================

const categories = [
  { id: "fiction", name: "Fiction", description: "Explore imaginative stories", icon: "book-open", color: "#8B4513" },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Discover real-world knowledge",
    icon: "lightbulb",
    color: "#2F4F4F",
  },
  { id: "science", name: "Science", description: "Dive into scientific discoveries", icon: "flask", color: "#4169E1" },
  {
    id: "romance",
    name: "Romance",
    description: "Fall in love with heartwarming tales",
    icon: "heart",
    color: "#DC143C",
  },
  {
    id: "children",
    name: "Children's",
    description: "Magical stories for young readers",
    icon: "sparkles",
    color: "#FFD700",
  },
  { id: "mystery", name: "Mystery", description: "Unravel thrilling puzzles", icon: "search", color: "#483D8B" },
  { id: "biography", name: "Biography", description: "Inspiring life stories", icon: "user", color: "#556B2F" },
  { id: "history", name: "History", description: "Journey through the ages", icon: "landmark", color: "#8B0000" },
]

export const CategoryModel = {
  getAll: () => categories,
  getById: (id) => categories.find((c) => c.id === id),
  count: () => categories.length,
}
