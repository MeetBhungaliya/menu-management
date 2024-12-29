const buildHierarchy = (items: any[]) => {
  const map = new Map<string, any>();

  // Create a map with all items by their ID
  items.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  const result: any[] = [];

  // Assign children to their respective parents
  items.forEach(item => {
    if (item.parent_id === item.menu_id) {
      // Top-level items (parent_id == menu_id)
      result.push(map.get(item.id)!);
    } else {
      // Find parent and add item as child
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children?.push(map.get(item.id)!);
      }
    }
  });

  return result;
};
export { buildHierarchy };
