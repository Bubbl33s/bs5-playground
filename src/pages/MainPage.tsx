import HtmlEditor from "../components/HtmlEditor";
import HtmlOutput from "../components/HtmlOutput";
import useEditor from "../hooks/useEditor";

export default function MainPage() {
  const { htmlCode, setHtmlCode, progress, expectedOutput } = useEditor();

  return (
    <div className="h-100 d-flex">
      <div className="d-flex flex-column w-50">
        {/* HTML editor */}
        <div className="flex-grow-1">
          <HtmlEditor setHtmlCode={setHtmlCode} />
        </div>
      </div>

      {/* HTML preview and result*/}
      <div className="d-flex flex-column w-50">
        <HtmlOutput id="editor-preview" htmlCode={htmlCode} />
        {/* Barra de progreso */}
        <div className="w-100 border-start border-end border-2 border-black position-relative">
          <p className="d-flex m-0 py-1 justify-content-center z-3 position-relative">
            {progress.toFixed(2)}%
          </p>
          <div
            className="bg-info text-black text-center h-100 position-absolute top-0 start-0 z-2"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <HtmlOutput id="expected-preview" htmlCode={expectedOutput} />
      </div>
    </div>
  );
}
