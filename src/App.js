import React, { useRef } from "react";

import EmailEditor from "react-email-editor";

const App = () => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log(data);
      // console.log("exportHtml", html);
    });
  };

  const onLoad = () => {
    // we will need to save the template in JSON format to the marketing API, then call it back in JSON format to show the user an existing template - for editing
    // Can we ask Miodrag if they can take the entire JSON object and use just the HTML to send the template?
    const templateJson = {};

    if (Object.keys(templateJson).length !== 0) {
      emailEditorRef.current.editor.loadDesign(templateJson);
    }
    return null;
  };

  const save = () => {
    emailEditorRef.current.editor.saveDesign((data) => {
      // this data is just the design part of the JSON
      console.log(data);
    });
  };

  return (
    <div>
      <h1>Unlayer</h1>
      <div
        style={{
          padding: "10px",
          width: "33%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={save}>Save Design</button>
      </div>

      <div
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <EmailEditor
          ref={emailEditorRef}
          minHeight="500px"
          style={{ border: "1px solid red" }}
          onLoad={onLoad}
          // locale="it"
          locale="en"
          safeHtml={true}
          appearance={{
            theme: "dark",
            panels: {
              tools: {
                dock: "left",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
