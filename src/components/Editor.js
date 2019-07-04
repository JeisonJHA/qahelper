// import React, { Component } from 'react';
// import MonacoEditor from 'react-monaco-editor';

// // import styles from './Editor.css';

// class Editor extends Component {
//   static editorDidMount(editor) {
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }

//   static onChange(newValue, e) {
//     console.log('onChange', newValue, e);
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       code: '// type your code...'
//     };
//   }

//   render() {
//     const { code } = this.state;
//     const options = {
//       selectOnLineNumbers: true,
//       roundedSelection: false,
//       readOnly: false,
//       cursorStyle: 'line',
//       automaticLayout: false
//     };

//     return (
//       // <div className={styles.editorContainer}>
//       <MonacoEditor
//         height="800"
//         width="600"
//         language="javascript"
//         theme="vs-dark"
//         value={code}
//         options={options}
//         onChange={this.onChange}
//         editorDidMount={this.editorDidMount}
//       />
//       // </div>
//     );
//   }
// }

// export default Editor;
