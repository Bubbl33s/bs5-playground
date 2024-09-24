import { HtmlEditor, HtmlOutput, ProgressBar } from "../components";
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

          <ProgressBar progress={25} height="0.6rem" />
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

            <ProgressBar
              progress={progress}
              height="4rem"
              textContent={`${progress.toFixed(2)}%`}
            />

            <HtmlOutput id="expected-preview" htmlCode={expectedOutput} />
          </div>
        </div>
      </main>
    </div>
  );
}
