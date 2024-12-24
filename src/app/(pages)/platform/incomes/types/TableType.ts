interface TableType<T> {
  getHeaders: () => string[];
  getValueByHeader: (header: keyof T) => any;
}
