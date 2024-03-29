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

  const layout = {};

  const onLoadTemplate = () => {
    if (Object.keys(layout).length !== 0) {
      return emailEditorRef?.current?.editor?.loadDesign(JSON.parse(layout));
    }
    emailEditorRef?.current?.editor?.addEventListener(
      "design:loaded",
      (data) => {
        // Design is loaded
        console.log("design load", data); // design json
      }
    );
  };

  const save = () => {
    emailEditorRef.current.editor.saveDesign((data) => {
      // this data is just the design part of the JSON
      console.log(data);
    });
  };

  emailEditorRef?.current?.editor?.addEventListener("design:loaded", (data) => {
    // Design is loaded
    console.log(data); // design json
  });

  let blocks = [
    {
      category: "Test",
      tags: ["tag1"],
      data: {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: "heading",
                values: {
                  containerPadding: "10px",
                  headingType: "h1",
                  fontFamily: {
                    label: "Arial",
                    value: "arial,helvetica,sans-serif",
                  },
                  fontSize: "22px",
                  textAlign: "left",
                  lineHeight: "140%",
                  linkStyle: {
                    inherit: true,
                    linkColor: "#0000ee",
                    linkHoverColor: "#0000ee",
                    linkUnderline: true,
                    linkHoverUnderline: true,
                  },
                  _meta: {
                    htmlClassNames: "u_content_heading",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: "Heading",
                },
              },
              {
                type: "button",
                values: {
                  containerPadding: "10px",
                  href: {
                    name: "web",
                    values: {
                      href: "",
                      target: "_blank",
                    },
                  },
                  buttonColors: {
                    color: "#FFFFFF",
                    backgroundColor: "#3AAEE0",
                    hoverColor: "#FFFFFF",
                    hoverBackgroundColor: "#3AAEE0",
                  },
                  size: {
                    autoWidth: true,
                    width: "100%",
                  },
                  textAlign: "center",
                  lineHeight: "120%",
                  padding: "10px 20px",
                  border: {},
                  borderRadius: "4px",
                  _meta: {
                    htmlClassNames: "u_content_button",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: '<span style="font-size: 14px; line-height: 16.8px;">Button Text</span>',
                },
              },
            ],
            values: {
              _meta: {
                htmlClassNames: "u_column",
              },
            },
          },
        ],
        values: {
          displayCondition: null,
          columns: false,
          backgroundColor: "",
          columnsBackgroundColor: "",
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: false,
            center: true,
            cover: false,
          },
          padding: "0px",
          hideDesktop: false,
          _meta: {
            htmlClassNames: "u_row",
          },
          selectable: true,
          draggable: true,
          duplicatable: true,
          deletable: true,
          hideable: true,
        },
      },
      displayMode: "email",
    },
  ];

  emailEditorRef?.current?.editor?.registerProvider(
    "blocks",
    function (params, done) {
      console.log("blocks provider", params);
      done(blocks);
    }
  );

  // these call backs would be used to manage on our side
  emailEditorRef?.current?.editor?.registerCallback(
    "block:added",
    function (newBlock, done) {
      console.log("block:added", newBlock);

      // Save the block to your database here
      // and pass the object to done callback.
      // Each block should have it's own unique id

      done(newBlock);
    }
  );

  emailEditorRef?.current?.editor?.registerCallback(
    "block:modified",
    function (existingBlock, done) {
      console.log("block:modified", existingBlock);

      // Update the block in your database here
      // and pass the updated object to done callback.

      done(existingBlock);
    }
  );

  emailEditorRef?.current?.editor?.registerCallback(
    "block:removed",
    function (existingBlock, done) {
      console.log("block:removed", existingBlock);

      // Delete the block from your database here.

      done(existingBlock);
    }
  );

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
          projectId={27694}
          id="editor"
          minHeight="500px"
          style={{ border: "1px solid blue", fontFamily: "Arial" }}
          onLoad={onLoadTemplate}
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
          options={{
            user: {
              id: 1,
              name: "Annika Chauhan",
              email: "a.chauhan@novafutur.com",
            },
            blocks: blocks,
          }}
          tools={{
            divider: {
              // whether a tool is visible or not
              // enabled: false,
            },
            heading: {
              // position of tool in the tools dock
              position: 1,
            },
            button: {
              // how many times you can use an item
              // usageLimit: 1,
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
