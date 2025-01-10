export default function PDFSection({ isFullScreen }) {
  return (
    <embed
      src="/pedoman-pkti-2023.pdf"
      className={`rounded-xl overflow-hidden w-1/2 sm:block hidden transition-all ${
        isFullScreen && "sm:hidden"
      }`}
      width="100%"
      height="100%"
      type="application/pdf"
    />
  );
}
