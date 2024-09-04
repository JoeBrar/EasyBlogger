import React from 'react'
import ReactQuill from 'react-quill';

const Editor = ({value, onChange}) => {

    let modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <div>
            <ReactQuill 
                value={value} 
                onChange={onChange} 
                modules={modules} 
                formats={formats}
            />
        </div>
    )
}

export default Editor