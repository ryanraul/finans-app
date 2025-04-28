interface TableType<T> {
  getHeaders: () => TableHeaderProps[];
  getCalculableHeaders: () => string[];
  getValueByHeader: (header: keyof T) => any;
}
