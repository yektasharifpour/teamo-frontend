type ShapeProps = {
  src: string;
  className: string;
};

export default function Shape({ src, className }: ShapeProps) {
  return (
    <img src={src} className={`${className} pointer-events-none absolute`} />
  );
}
