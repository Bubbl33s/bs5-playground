import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import pixelmatch from "pixelmatch";
import debounce from "lodash.debounce";
import { levelsData } from "../data/levels";

export default function useEditor() {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(
    parseInt(localStorage.getItem("currentLevel") || "1")
  );
  const [initialDiff, setInitialDiff] = useState(0);

  // Función para capturar el ImageData de un elemento HTML
  const captureImageData = async (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`${elementId} not found.`);
      return null;
    }

    const canvas = await html2canvas(element, { useCORS: true });
    const context = canvas.getContext("2d");

    if (!context) {
      console.error(`Failed to get 2D context for ${elementId}.`);
      return null;
    }

    return context.getImageData(0, 0, canvas.width, canvas.height);
  };

  // Función para comparar dos imágenes y devolver el porcentaje de diferencia
  const compareImages = (
    inputImageData: ImageData,
    outputImageData: ImageData
  ) => {
    if (
      inputImageData.width !== outputImageData.width ||
      inputImageData.height !== outputImageData.height
    ) {
      console.error("Canvas dimensions do not match.");
      return 0;
    }

    const diffData = pixelmatch(
      inputImageData.data,
      outputImageData.data,
      null,
      outputImageData.width,
      outputImageData.height
    );

    return diffData;
  };

  // Captura la imagen blanca inicial (vacía) al cargar el componente
  const captureInitialDiff = async () => {
    const inputImageData = await captureImageData("editor-preview");
    const outputImageData = await captureImageData("expected-preview");

    if (inputImageData && outputImageData) {
      const diffData = compareImages(inputImageData, outputImageData);
      const diffPercentage =
        (diffData * 2) / (outputImageData.width * outputImageData.height);
      setInitialDiff(diffPercentage);
    }
  };

  useEffect(() => {
    captureInitialDiff();
  }, []);

  // Captura las imágenes y las compara para obtener el progreso
  const captureAndCompare = async () => {
    const inputImageData = await captureImageData("editor-preview");
    const outputImageData = await captureImageData("expected-preview");

    if (inputImageData && outputImageData) {
      const diffData = compareImages(inputImageData, outputImageData);
      const diffRatio =
        outputImageData.width * outputImageData.height * initialDiff;
      const diffPercentage = 100 - (diffData / diffRatio) * 100;
      setProgress(diffPercentage > 0 ? diffPercentage : 0);
    }
  };

  // Crear una función debounce para capturar y comparar
  const debouncedCaptureAndCompare = debounce(captureAndCompare, 500);

  // Ejecutar la función de comparación cuando htmlCode cambia
  useEffect(() => {
    debouncedCaptureAndCompare();

    // Cleanup en caso de que el componente se desmonte
    return () => {
      debouncedCaptureAndCompare.cancel();
    };
  }, [htmlCode]);

  return {
    htmlCode,
    setHtmlCode,
    progress,
    levelsData,
    currentLevel,
    setCurrentLevel,
  };
}
