interface Props {
  length: number;
  children: string;
}
const LimitedText = ({ children, length }: Props) => {
  const text =
    children.length > length
      ? children.substring(0, length - 3) + " [...]"
      : children;
  return <span>{text}</span>;
};

export default LimitedText;
