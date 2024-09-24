import { useEffect, useState } from "react";
import { HtmlEditor, HtmlOutput, ProgressBar } from "../components";
import useEditor from "../hooks/useEditor";

export default function MainPage() {
  const {
    htmlCode,
    setHtmlCode,
    progress,
    levelsData,
    currentLevel,
    setCurrentLevel,
  } = useEditor();

  const [cantContinue, setCantContinue] = useState<boolean>(true);
  const [levelsProgress, setLevelsProgress] = useState<number>(
    ((currentLevel - 1) * 100) / levelsData.length
  );

  useEffect(() => {
    if (progress === 100) {
      const nextLevel = currentLevel + 1;
      if (nextLevel <= levelsData.length) {
        // setCurrentLevel(nextLevel);
        setCantContinue(false);
        setLevelsProgress((currentLevel * 100) / levelsData.length);
      }
    }
  }, [progress]);

  const handleContinue = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= levelsData.length) {
      setCurrentLevel(nextLevel);
      setLevelsProgress(((currentLevel - 1) * 100) / levelsData.length);
      setHtmlCode("");
    }
  };

  return (
    <div className="h-100 d-flex flex-column container pt-3 pb-4">
      <header className="">
        <p className="fw-bold fs-1 mb-1">Bootstrap Playground</p>
        <p className="fw-medium text-secondary">Master Bootstrap utilities</p>
      </header>

      <main className="h-100 bg-white p-4 rounded-3 shadow-lg d-flex flex-column gap-4">
        <header className="">
          <div className="d-flex justify-content-between">
            <p className="fs-4 fw-bold">
              Level {currentLevel} of {levelsData.length}
            </p>

            <div className="">
              {/* <button className="btn btn-dark" disabled={currentLevel <= 1}>
                Previous
              </button> */}
              <button
                className="btn btn-dark ms-2"
                disabled={cantContinue || currentLevel >= levelsData.length}
                onClick={handleContinue}
              >
                Next
              </button>
            </div>
          </div>

          <ProgressBar progress={levelsProgress} height="0.6rem" />
        </header>

        <div className="d-flex flex-grow-1 gap-3">
          {/* HTML editor */}
          <div
            className="w-50 rounded-3 overflow-hidden py-3"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <HtmlEditor
              setHtmlCode={setHtmlCode}
              template={levelsData[currentLevel - 1].template}
            />
          </div>

          {/* HTML preview and result*/}
          <div className="d-flex flex-column w-50 gap-2">
            <HtmlOutput id="editor-preview" htmlCode={htmlCode} />

            <ProgressBar
              progress={progress}
              height="4rem"
              textContent={`${progress.toFixed(2)}%`}
            />

            <HtmlOutput
              id="expected-preview"
              htmlCode={levelsData[currentLevel - 1].content}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
