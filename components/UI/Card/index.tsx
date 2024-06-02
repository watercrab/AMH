import React, { HTMLAttributes } from "react";

import clsx from "clsx";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: ICardProps) => {
  return (
    <div className={clsx([`card`, className])} {...props}>
      {children}
    </div>
  );
};

export default Card;
