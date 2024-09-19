import Editor, { EditorProps, Monaco } from "@monaco-editor/react";
import * as emmetMonaco from "emmet-monaco-es";
// import completions from "../utils/tailwind-completions.json";

type HtmlEditorProps = {
  setHtmlCode: (code: string) => void;
};

export default function HtmlEditor({ setHtmlCode }: HtmlEditorProps) {
  function handleEditorWillMount(monaco: Monaco) {
    emmetMonaco.emmetHTML(monaco);

    monaco.languages.html.htmlDefaults.setOptions({
      suggest: {
        html5: true, // Autocompletado de HTML5
        emmet: true, // Habilitar Emmet
      },
    });
    /*
    monaco.languages.registerCompletionItemProvider("html", {
      provideCompletionItems: (model, position) => {
        const wordInfo = model.getWordUntilPosition(position);
        const range = new monaco.Range(
          position.lineNumber,
          wordInfo.startColumn,
          position.lineNumber,
          wordInfo.endColumn
        );

        const textUntilPosition = model.getValueInRange(
          new monaco.Range(1, 1, position.lineNumber, position.column)
        );
        const classAttributeRegex = /class\s*=\s*["'][^"']*$/;
        const isInsideClassAttribute =
          classAttributeRegex.test(textUntilPosition);

        if (!isInsideClassAttribute) {
          return { suggestions: [] };
        }


        const suggestions = completions.map(([label, info]) => ({
          label,
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: label,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: info,
          range,
        }));

        return {
          suggestions,
        };
      },
    });*/
  }

  const editorOptions: EditorProps = {
    language: "html",
    defaultValue: `<div class="">\n\n</div>`,
    theme: "vs-dark",
    options: {
      wordWrap: "on",
      minimap: { enabled: false },
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      tabSize: 2,
      automaticLayout: true,
      fontSize: 16,
    },
    height: "99.9%",
    className: "",
    onChange: (value) => {
      setHtmlCode(value ?? "");
    },
    beforeMount: handleEditorWillMount,
  };

  return <Editor {...editorOptions} />;
}
