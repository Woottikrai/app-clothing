import React from "react";
import { IProduct } from "../../interface/IProduct";
type Props<T> = {
  items?: Array<T>;
  renderItem: (itemProps: {
    item: T;
    idx: number;
    key?: number | string;
    array: Array<T>;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function OptionalLayout({
  items,
  renderItem,
  className,
  style,
}: Props<IProduct>) {
  return (
    <div className={`${className}`} style={style}>
      {items?.map((item, idx, array) => {
        return (
          <React.Fragment key={item.id}>
            {renderItem({ item, idx, array, key: item.idx })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
