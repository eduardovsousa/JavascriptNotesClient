import React, { Fragment, useState, useEffect } from 'react';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

function Editor(props) {
    //Conteudo atual do editor, 
    const [currentContent, setCurrentContent] = useState('')
    //Timer, se o usuário parar de digitar por um tempo, irá atualizar
    const [timer, setTimer] = useState(null)

    const updateNote = (content) => {
        //Pegando o título da nota
         const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
         props.updateNote(props.note, {'title': title, 'body': content})
    }

    const handleChange = (content, delta, source) => {
        clearTimeout(timer)
        if(source == 'user') {
            setCurrentContent(content)
            setTimer(setTimeout(() => updateNote(content), 2000))
        }
    }


    useEffect(() => {
        
        setCurrentContent(props.note.body)
    }, [props.note])

    // Opções de editores de texto
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <Fragment>
            {/* Vai aceitar os modules */}
            <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
        </Fragment>
    )
}

export default Editor;