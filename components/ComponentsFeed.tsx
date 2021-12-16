import ReactMarkdown from "react-markdown";

export default function ComponentsFeed({ components }) {
    return components ? components.map((comp) => <Component key={comp.slug} component={comp} />) : null; // FIXME: what is this error telling me
}

function Component({ component }) {
    return (
        <div className="component">
            <h1>{component?.title}</h1>
            <ReactMarkdown>{component?.documentation}</ReactMarkdown>
        </div>
    );
}