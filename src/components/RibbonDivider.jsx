export default function RibbonDivider() {
  return (
    <div className="relative mx-auto my-3 flex max-w-5xl items-center justify-center px-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne to-petal" />
      <div className="ribbon-knot mx-4">♥</div>
      <div className="h-px flex-1 bg-gradient-to-r from-petal via-champagne to-transparent" />
    </div>
  );
}
