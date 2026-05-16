type FloatingShapeProps = {
  className?: string;
};

export default function FloatingShape({ className = "" }: FloatingShapeProps) {
  return (
    <div
      className={`
          absolute
          rounded-full
          blur-[2px]
          opacity-90
          ${className}
        `}
    />
  );
}
