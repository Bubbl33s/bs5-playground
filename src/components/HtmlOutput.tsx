type HtmlOutputProps = {
  id: string;
  htmlCode: string;
};

export default function HtmlOutput({ id, htmlCode }: HtmlOutputProps) {
  return (
    <div
      id={id}
      dangerouslySetInnerHTML={{ __html: htmlCode }}
      className="border border-2 border-black w-100 h-100"
    ></div>
  );
}
