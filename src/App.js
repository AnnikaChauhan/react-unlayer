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
    // how to save to our server and call back designs: https://docs.unlayer.com/docs/templates
    // we will need to save the template in JSON format to the marketing API, then call it back in JSON format to show the user an existing template - for editing
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
          style={{ border: "1px solid red", fontFamily: "Arial" }}
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
          tools={{
            divider: {
              // whether a tool is visible or not
              enabled: false,
            },
            heading: {
              // position of tool in the tools dock
              position: 1,
            },
            button: {
              // how many times you can use an item
              usageLimit: 1,
              properties: {
                // changes default properties of tool
                buttonColors: {
                  value: {
                    color: "#000",
                    backgroundColor: "#3AAEE0",
                    hoverColor: "#FFFFFF",
                    hoverBackgroundColor: "#3AAEE0",
                  },
                },
                padding: {
                  value: "10px 20px",
                },
                textAlign: {
                  value: "center",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
