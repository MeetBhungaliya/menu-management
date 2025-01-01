const buildHierarchy = (items: any[]) => {
  const map = new Map<string, any>();

  items.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  const result: any[] = [];

  items.forEach(item => {
    if (item.parent_id === item.menu_id) {
      result.push(map.get(item.id)!);
    } else {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children?.push(map.get(item.id)!);
      }
    }
  });

  return result;
};
export { buildHierarchy };
