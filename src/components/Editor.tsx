import HtmlEditor from "./HtmlEditor";
import useEditor from "../hooks/useEditor";

export default function Editor() {
  const { htmlCode, setHtmlCode, progress, expectedOutput } = useEditor();

  return (
    <div className="vh-100 d-flex">
      <div className="d-flex flex-column w-50">
        {/* HTML editor */}
        <div className="flex-grow-1">
          <HtmlEditor setHtmlCode={setHtmlCode} />
        </div>
        {/* Barra de progreso */}
        <div className="w-100 border border-2 border-black">
          <div
            className="bg-info text-black text-center"
            style={{ width: `${progress}%` }}
          >
            {progress.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* HTML preview and result*/}
      <div className="d-flex flex-column w-50">
        <div
          id="editor-preview"
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          className="border border-2 border-black w-100 h-100"
        ></div>
        <div
          id="expected-preview"
          className="border border-2 border-black w-100 h-100"
          dangerouslySetInnerHTML={{ __html: expectedOutput }}
        ></div>
      </div>
    </div>
  );
}
