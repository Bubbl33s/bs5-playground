type ProgressBarProps = {
  progress: number;
  height: string;
  textContent?: string;
};

export default function ProgressBar({
  progress,
  height,
  textContent,
}: ProgressBarProps) {
  return (
    <div
      className="progress position-relative"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height: height, backgroundColor: "#cecece" }}
    >
      {textContent && (
        <p className="m-0 position-relative fs-6 z-3 text-light fw-medium w-100 d-flex justify-content-center align-items-center">
          {progress.toFixed(2)}%
        </p>
      )}

      <div
        className="progress-bar position-absolute top-0 start-0 h-100 z-2"
        style={{ width: `${progress}%`, backgroundColor: "#000" }}
      ></div>
    </div>
  );
}
