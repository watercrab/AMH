import React from "react";

interface ISpinnerProps {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
}
const Spinner = ({ sm, md, lg }: ISpinnerProps) => {
  return <span>Loading...</span>;
};

export default Spinner;
