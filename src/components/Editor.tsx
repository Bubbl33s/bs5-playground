import HtmlEditor from "./HtmlEditor";
import useEditor from "../hooks/useEditor";

export default function Editor() {
  const { htmlCode, setHtmlCode, progress, expectedOutput } = useEditor();

  return (
    <div className="h-screen max-h-screen flex">
      <div className="flex flex-col w-1/2 bg-gray-900">
        {/* HTML editor */}
        <div className="flex-grow">
          <HtmlEditor setHtmlCode={setHtmlCode} />
        </div>
        {/* Barra de progreso */}
        <div className="w-full border-2 border-gray-900 bg-gray-200">
          <div
            className="bg-cyan-500 text-black text-center"
            style={{ width: `${progress}%` }}
          >
            {progress.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* HTML preview and result*/}
      <div className="flex flex-col w-1/2">
        <div
          id="editor-preview"
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          className="border-2 border-gray-900 w-full h-full"
        ></div>
        <div
          id="expected-preview"
          className="border-2 border-gray-900 w-full h-full"
          dangerouslySetInnerHTML={{ __html: expectedOutput }}
        ></div>
      </div>
    </div>
  );
}
