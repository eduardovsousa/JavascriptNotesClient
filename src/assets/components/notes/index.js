import { Fragment, useState, useEffect } from "react";
import { Column } from 'rbx'
import '../../../styles/notes.scss';
//Importando ado "react-burger-menu" o estilo de menu "push"
import { push as Menu } from 'react-burger-menu'
import List from "./list";
import Editor from "./editor";
import Search from "./search";
import NotesService from "../../../services/notes";

const Notes = (props) => {
    //Notes= Listagem de notas, currentNote= Nota atual,
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });


    async function fetchNotes() {
        const response = await NotesService.index();
        //verifica se tem mais de uma nota
        if (response.data.length >= 1) {
            //Inverte a ordem das notas, da mais recente pra menos
            setNotes(response.data.reverse())
            setCurrentNote(response.data[0])
        } else {
            setNotes([])
        }
    }

    //Criando uma nova nota
    const createNote = async () => {
        await NotesService.create()
        fetchNotes()
    }

    //Método de delete
    const deleteNote = async(note) => {
        await NotesService.delete(note._id)
        fetchNotes()
    }

    //Método para atualizar
    const updateNote = async (oldNote, params) => {
        const updatedNote = await NotesService.update(oldNote._id, params)
        const index = notes.indexOf(oldNote)
        const newNotes = notes
        newNotes[index] = updatedNote.data
        setNotes(newNotes)
        setCurrentNote(updatedNote.data)
    }

    //Método de search
    const searchNotes = async(query) => {
        const response = await NotesService.search(query)
        setNotes(response.data)
    }

    //Quando chamar a nota, achará o ID
    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        setCurrentNote(note);
    }

    useEffect(() => {
        fetchNotes();
    }, []);



    return (
        <Fragment>
            {/* Grupo de colunas chamando a classes notes */}
            <Column.Group className="notes" id="notes">
                {/* Menu importado do react-burguer-menu e passar os elementos dentro dele */}
                <Menu
                    // onde clicar para fechar o menu 
                    pageWrapId={"notes-editor"}
                    isOpen={props.isOpen}
                    onStateChange={(state) => props.setIsOpen(state.isOpen)}
                    // Tirar o foco
                    disableAutoFocus
                    outerContainerId={"notes"}
                    //Tirando os icones e o que vem a mais
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={10} offset={1}>
                            <Search searchNotes={searchNotes} fetchNotes={fetchNotes} />
                        </Column>
                    </Column.Group>
                    <List
                        notes={notes}
                        selectNote={selectNote}
                        current_note={current_note}
                        deleteNote={deleteNote}
                        createNote={createNote}
                        />
                </Menu>

                <Column size={12} className="notes-editor" id="notes-editor">
                    {/* Chamando o editor de texto */}
                    <Editor
                        note={current_note}
                        updateNote={updateNote}
                    />
                </Column>
            </Column.Group>
        </Fragment>
    )
}

export default Notes