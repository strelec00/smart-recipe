interface ButtonProps {
  text: string;
  className: string;
}

const Button = ({ text, className }: ButtonProps) => {
  return (
    <div className="">
      <button className={className}>{text}</button>
    </div>
  );
};

export default Button;
