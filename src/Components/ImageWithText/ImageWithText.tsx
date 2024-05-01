import "./ImageWithText.scss";

interface ImageWithTextProps {
  text: string;
  imageUrl: string;
  direction?: "Normal" | "Reverse";
  wrap?: "Normal" | "Reverse";
}

export default function ImageWithText({
  text,
  imageUrl,
  direction,
  wrap,
}: ImageWithTextProps) {
  return (
    <div
      className="image-with-text-container"
      style={{
        flexDirection:
          !direction || direction === "Normal" ? "row" : "row-reverse",
        flexWrap: !wrap || wrap === "Normal" ? "wrap" : "wrap-reverse",
      }}
    >
      <div className="image-text-container">
        <p>{text}</p>
      </div>
      <img src={imageUrl} />
    </div>
  );
}
