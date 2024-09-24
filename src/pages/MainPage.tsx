import HtmlEditor from "../components/HtmlEditor";
import HtmlOutput from "../components/HtmlOutput";
import useEditor from "../hooks/useEditor";

export default function MainPage() {
  const { htmlCode, setHtmlCode, progress, expectedOutput } = useEditor();

  return (
    <div className="h-100 d-flex flex-column container pt-3 pb-4">
      <header className="">
        <p className="fw-bold fs-1 mb-1">Bootstrap Playground</p>
        <p className="fw-medium text-secondary">Master Bootstrap utilities</p>
      </header>

      <main className="h-100 bg-white p-4 rounded-3 shadow-lg d-flex flex-column gap-4">
        <header className="">
          <div className="d-flex justify-content-between">
            <p className="fs-4 fw-bold">Level 1 of 43</p>

            <div className="">
              <button className="btn btn-dark">Previous</button>
              <button className="btn btn-dark ms-2">Next</button>
            </div>
          </div>

          <div
            className="progress"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ height: "0.6rem", backgroundColor: "#cecece" }}
          >
            <div
              className="progress-bar"
              style={{ width: "50%", backgroundColor: "#000" }}
            ></div>
          </div>
        </header>

        <div className="d-flex flex-grow-1 gap-3">
          {/* HTML editor */}
          <div
            className="w-50 rounded-3 overflow-hidden py-3"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <HtmlEditor setHtmlCode={setHtmlCode} />
          </div>

          {/* HTML preview and result*/}
          <div className="d-flex flex-column w-50 gap-2">
            <HtmlOutput id="editor-preview" htmlCode={htmlCode} />

            {/* Barra de progreso */}
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ height: "4rem", backgroundColor: "#cecece" }}
            >
              <div
                className="progress-bar fs-6"
                style={{ width: `${progress}%`, backgroundColor: "#000" }}
              >
                <p className="m-0">{progress.toFixed(2)}%</p>
              </div>
            </div>

            <HtmlOutput id="expected-preview" htmlCode={expectedOutput} />
          </div>
        </div>
      </main>
    </div>
  );
}
